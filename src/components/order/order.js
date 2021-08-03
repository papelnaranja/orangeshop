// import { getFirestore } from '../../firebase/firebase';
import { CartContext } from '../../context/cartContext.js';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {Loader} from '../loader/loader'
import { NoMatch } from '../noMatch/noMatch';

import './order.scss'

export const Order = () => {

    const { orderId } = useParams()
    const {getOrderBill, bill,statusOrder } = useContext(CartContext)


    useEffect(()=>{
        getOrderBill(orderId)
        
    },[])

    switch (statusOrder){
        case 1:
            return(
                <main>
                    <div className="container">
                    <div id="order" className="card">
                        <div className="card-body">
                            <h2 className="order-title"> Resumen de orden </h2>
                            <table className="table table-order-buyer-info">
                                <tbody>
                                    <tr>
                                        <th>Orden</th>
                                        <td>{bill.id}</td>
                                    </tr>

                                    <tr>
                                        <th>Nombre Apellido</th>
                                        <td>{bill.buyer.name} {bill.buyer.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th>Teléfono</th>
                                        <td>{bill.buyer.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{bill.buyer.email}</td>
                                    </tr>
                                </tbody>
                            </table>     
                            <table className="table table-order-products -info">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th className="product-qnty">Cantidad</th>
                                        <th className="product-price">Precio</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {
                                bill.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td className="product-qnty">{item.qnty}</td>
                                        <td className="product-price">${item.price}</td>
                                    </tr>
                                
                                ))}
                                <tr>
                                    <td colSpan="2" className="total-label">Total</td>
                                    <td className="total-price">$ {bill.total}</td>
                                </tr>
                                </tbody>
                            </table>

                        
                        </div>
                    </div> 
                    </div> 

                </main>
            )
        case 2:
            return(
               <NoMatch mensaje="Esta Orden no existe" />
            )
        default:
            return(
                <Loader />
                
            )
    }
}
 