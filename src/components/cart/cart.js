import './cart.scss';
import { CartContext } from '../../context/cartContext.js';
import { useContext, useState, useEffect } from 'react';
import { ItemCount } from '../itemCount/itemCount'
import { Link, Redirect} from "react-router-dom";
import {Order} from '../order/order'
import firebase from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from '../../firebase/firebase';
import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../../lotties/loader'

export const Cart = ()=> {
    const {products, removeItem, clear, modificadorProductos, generateOrder,orderId, sumTotal, total} = useContext(CartContext)
    const [bill, setBill] = useState(undefined)
    const [loader, setLoader] = useState(false)


    let carro = false;
    if(products.length > 0) {
        carro = true;
    }
    const onAdd = (cantidad, event, product ) => {
        modificadorProductos(product.item, cantidad)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        generateOrder(products, e)
    }

    useEffect(()=>{sumTotal(products)}, [products])

    /*
    * 🐢 Pendinete:
    * Hay que pasarlo al cartcontext.js como función 
    */
    useEffect(()=>{
        if(orderId) {
            const db = getFirestore();
            const firebaseOrder = db.collection('orders').doc(orderId)
    
            firebaseOrder.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setBill({id: doc.id, ...doc.data()})
            } else {
                // doc.data() will be undefined in this case
                console.log(`la id: <${orderId}>, no se encuntra`);
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

    },[orderId])
    
    
    /* 🐢 Pendinte: 
    /* Hay que generar el loader y crear un componente como tal para que este más ordenado */
    if(loader == true) {
        return(
            <div className="loader-container">
                <Player autoplay loop src={loader}style={{ height: '300px', width: '300px' }}></Player>
            </div>
        )
    }

    /* 🐢 Pendinte: 
    /* Re-hacer esto que esta super desordenado */
    if(!carro && !orderId){
        return(
            <main>
                <div className="container">
                    <h1>Carro de compra</h1>
                    <div className="card">
                        <div className="card-body">
                            <p>Actualmente esta vacio, busca algo en la tienda</p>
                            <Link to="/" className="btn btn-secondary">Ir al inicio</Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    } 
    else {
        return(
            <main>
                <div className="container">
                    <h1>Carro de compra</h1>
                    { orderId && bill ? 
                        <Order bill={bill} /> :
                        <div className="row">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body">
                                
                                        { products.map(product => 
                                            <div className="item-row" key={product.item.id} >
                                                <div className="item-image-wrap">
                                                    <img className="item-image" src={product.item.picture} alt={product.item.alt} width="200"  />
                                                </div>
                                                <div className="item-col">
                                                    <h3 className="item-title">{product.item.title}</h3>
                                                        <div className="item-info-wrap">
                                                            <div className="item-info-one">
                                                                <h6 className="item-subtitle">Cantidad</h6>
                                                                <ItemCount stock={product.item.stock} initial={ product.quantity } onAdd={onAdd} product={product} btnText={"Modificar Cantidad"}/>
                                                            </div>
                                                            <div className="item-info-two">
                                                                <h6 className="item-subtitle">Precio Unitario</h6>
                                                                <p>${ product.item.price}</p>
                                                            </div>
                                                            <div className="item-total">
                                                                <h6 className="item-subtitle">Total product</h6>
                                                                <p>$ { product.quantity * product.item.price}</p>
                                                            </div>
                                                        </div>
                                                    <a className="link" onClick={()=>{removeItem(product.item.id)}}>Eliminar producto</a>
                                                </div>
                                                
                                            </div>
                                        ) }
                                        <div className="section-total">
                                            <h3>Total: {total}</h3>
                                        </div>
                                        <div className="section-limpiar">
                                            <button onClick={()=>{clear()}}>Limpiar todo</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h3>Información de compra</h3>
                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" name="nombre" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="apellido">Apellido</label>
                                            <input type="text" name="apellido" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Teléfono</label>
                                            <input type="text" name="phone" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emailRepeat">Repetir Email</label>
                                            <input type="email" name="emailRepeat" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" >Realizar Pedido</button>
                                        </div>

                                    </form>

                                </div>


                            </div>
                            

                            
                        </div>
                    
                    </div> 
         
                
                    }
                </div>
            </main>
        )

    }

}