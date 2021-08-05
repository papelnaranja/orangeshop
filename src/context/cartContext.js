import { useEffect } from "react";
import { createContext, useState } from "react"
import firebase from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from '../firebase/firebase';
export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [products , setProducts ] = useState([])
    const [cantidadCarro, setCantidadCarro] = useState(0)
    const [order, setOrder] = useState()
    const [orderId, setOrderId] = useState(undefined)
    const [total, setTotal] = useState(undefined);
    const [bill, setBill] = useState(undefined)
    const [statusStock, setStatusStock] = useState(undefined);
    const [statusOrder, setStatusOrder] = useState(0);
    //let orderStatus = false;
    const db = getFirestore();

    //console.log('products:', products)
    function modificadorProductos(currentProduct, cantidad) {

        // console.log('En el context currentProduct(viene del detalle):', currentProduct)
        // console.log('Context product id', currentProduct.id)

        const isInCart = products.some( product => product.item.id === currentProduct.id )
        if(!isInCart) { 
            // Crea un producto nuevo nuevo y lo agrega a productos
            const nuevoItem = {
                item: {
                    title: currentProduct.title,
                    id: currentProduct.id ,
                    picture: currentProduct.picture,
                    price: currentProduct.price,
                },
                quantity: cantidad
            }
            setProducts([...products, nuevoItem]);
        } else {
            // Busca el proucto y suma la cantidad y cambia el array 
            addItem(currentProduct, cantidad)
        }

    }

    // Actualiza el circulo rojo del carrito 
    function circuloRojoCarrito() {
        let total = 0
        if(products.length > 0) {
            // Quería usar reduce, pero se rompia al tercer producto
            products.forEach((product) => {
                total += product.quantity
            })
        } 
        //console.log('total:', total)
        setCantidadCarro(total)
    }
    
    // Agregar cierta cantidad de un ítem al carrito
    function addItem(currentProduct, cantidad) {

        // En teoria: agregaría un item y le sumaría la cantidad.
        products.forEach( product => {
            if(product.item.id === currentProduct.id ) {

               //return product.quantity += cantidad
               /* No va sumar la nueva cantidad, si no que remplazará la actual */
                return product.quantity = cantidad
            }
        })
        setProducts([...products]);

    }

    function removeItem(currentProductId) {
        //filta y regresa lo que es distinto
        setProducts(products.filter(product => product.item.id !== currentProductId))
    }

    function clear() {
        // En toeria: limpia el array de productos.
        setProducts([]);
        setCantidadCarro(0)
    }

    function  sumTotal(products) {
        let number = 0;
        products.map(product => number += product.quantity * product.item.price)
        return setTotal(number);
    }

    function generateOrder(products, e ) {
        let itemsArray = []
        products.map((product)=> {
            itemsArray.push({
                id: product.item.id,
                title: product.item.title,
                price: product.item.price,
                qnty: product.quantity,
            })
        })
        //console.log('buyer e', e)
        setOrder(
            {
            buyer: {
                name: e.target.nombre.value ,
                lastName: e.target.apellido.value ,
                phone: e.target.telefono.value ,
                email: e.target.correo.value,
            },
            estado: 'Generada',
            items: itemsArray,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: total,
            }
        )
    }

    /* Nota para mi:
    * Las funciones asincronas se ejecutan inmediatamente ? */
   /* Los tems debe venir de orden.items */
    async function cheackAndReduceStock(items) {
        //console.log('ReduceStock items:', items)

        if(items !== undefined) {
            const itemsToUpdate = db.collection("orangepaper-products")
                .where(firebase.firestore.FieldPath.documentId(), 'in', items.map(item => item.id));

            const query = await itemsToUpdate.get();
            const batch = db.batch();
            const outOfStock = []

            query.docs.forEach((docSnapshot, index)=> {
                if( docSnapshot.data().stock >= items[index].qnty) {
                    batch.update(docSnapshot.ref , { stock: docSnapshot.data().stock - items[index].qnty})
                } else {
                    outOfStock.push({id: docSnapshot.id, title: docSnapshot.data().title, stock: docSnapshot.data().stock  })
                }
            })
            if(outOfStock.length === 0 ) {
                await batch.commit() 
                return true;
            } else {
                setStatusStock(outOfStock)
                return false;
            }
        }
    }


    function getOrderBill(orderId) {
        const db = getFirestore();
        const firebaseOrder = db.collection('orders').doc(orderId)
        firebaseOrder.get()
            .then((doc) => {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    setBill({id: doc.id, ...doc.data()})
                    setStatusOrder(1)
                } else {
                    console.log(`la id: <${orderId}>, no se encuntra`);
                    setStatusOrder(2)
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }
    
    function updateNewOrder(newOrder) {
        const orders = db.collection("orders");
        orders.add(newOrder).then(({id}) => {
            setOrderId(id) //exito
            //limpiar
            newOrder = {}
            setOrder({})
            clear()
        }).catch(err => {
            console.warn('Error:', err)
        }).finally(()=>{
            console.log('Nueva orden terminada', newOrder )
        })     
    }

    useEffect(()=> {
        let isMounted = true; 
        let newOrder =  {...order}
        if(newOrder) {
            cheackAndReduceStock(newOrder.items)
                //espera a que termine de checkear y reducir el stock
                .then((result) => {
                    //console.log('result:', result )
                    if( newOrder.buyer !== undefined && statusStock === undefined && result && isMounted ) {                        
                        updateNewOrder(newOrder)
                    }
                }).catch(error => {
                    console.warn('Error en stock:' , error)
                })
        }
        return () => { isMounted = false }
    }, [order])

    // Escucha si hay un cambio en el estado de productos y ejecuta la función.
    useEffect(()=>{
        circuloRojoCarrito();
    }, [products])
    
    useEffect(()=>{
        // Limpia el carro si no hay stock de un producto
        if(statusStock !== undefined) {
            console.log('Limpiado')
            setOrder({})
            clear()  
        }
    }, [statusStock])

    return <CartContext.Provider value={{
        modificadorProductos, 
        removeItem, 
        clear, 
        addItem, 
        generateOrder,
        sumTotal, 
        getOrderBill,
        setStatusStock,
        setOrderId,
        statusOrder,
        statusStock,
        products, 
        cantidadCarro, 
        bill, 
        total, 
        orderId
    }}>{children}</CartContext.Provider>

}