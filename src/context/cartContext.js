import { useEffect } from "react";
import { createContext, useState } from "react"

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [user , setUser ] = useState([]);
    const [products , setProducts ] = useState([])
    const [cantidadCarro, setCantidadCarro] = useState(0)

    console.log('products:', products)

    function modificadorProductos(currentProduct, cantidad) {
        console.log('En el context currentProduct(viene del detalle):', currentProduct)
        console.log('context product id', currentProduct.id)
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

            /*
            * 📢 Pregunta tutor:
            * El forEach recorre el arreglo y puede modificarlo.
            * En este caso se recorre products que es un estado, y debería modificarse usando setProducts y no directamente. 
            * Pero si ocupo setProduct, no sé como acceder al arreglo para modificarlo 😐
            * ¿Esta bien usada la función?
            */

            // Busca el proucto y suma la cantidad y cambia el array 
            addItem(currentProduct, cantidad)
            // products.forEach( product => {
            //     if(product.item.id == currentProduct[0].id ) {
            //        return product.quantity += cantidad
            //     }
            // })
            // setProducts([...products]);

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
        console.log('total:', total)
        setCantidadCarro(total)
    }
    
    // Agregar cierta cantidad de un ítem al carrito
    function addItem(currentProduct, cantidad) {
        // En teoria: agregaría un item y le sumaría la cantidad.
        products.forEach( product => {
            if(product.item.id == currentProduct.id ) {
               //return product.quantity += cantidad
               /* No va sumar la nueva cantidad, si no que remplazará la actual */
                return product.quantity = cantidad
            }
        })
        setProducts([...products]);

    }

    // Remover un item del cart por usando su id.
    function removeItem(currentProductId) {
        // En teoria: filta y regresa lo que es distinto
        setProducts(products.filter(product => product.item.id !== currentProductId))
    }

    // Remover todos los products
    function clear() {
        // En toeria: limpia el array de productos.
        setProducts([]);
        setCantidadCarro(0)
    }

    // Escucha si hay un cambio en el estado de productos y ejecuta la función.
    useEffect(()=>{
        circuloRojoCarrito();
    }, [products])
    


    /* Nota tutor
    * Ignorar esta parte, es para recordar como funciona el contexto
    * lo eliminaré para la entrega final 
    */
    const [vegetal , setVegetal ] = useState({
        fruta: '🍓',
        verdura: '🥬 '
    });
    let testEmpy = []
    const fruta = {
        fruta: user.fruta
    }
    function setFruta(fruta) {
        setUser({
            fruta: fruta,
        })
    }
    /* Nota para mi:
    * No entiendo porque se debe enviar la información destructurada en el value.
    * ¿Cómo sería si fuera sin destructurar?  useState.user, setName, this.empy?
    * En el value solo va lo que quieres que sea accedido de manera global, no dejar la función entera. 
    */
    //return <CartContext.Provider value={{ user, fruta ,setFruta, testEmpy }}>{children}</CartContext.Provider>
    return <CartContext.Provider value={{products, cantidadCarro, modificadorProductos, removeItem, clear, addItem}}>{children}</CartContext.Provider>

}