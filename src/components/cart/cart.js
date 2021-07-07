import './cart.scss';
import { CartContext } from '../../context/cartContext.js';
import { useContext } from 'react';
import {ItemCount} from '../itemCount/itemCount'

export const Cart = ()=> {
    const {products, removeItem, clear, addItem} = useContext(CartContext)
    let carro = false;
    if(products.length > 0) {
        carro = true;
    }

    return(
        <main>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h1>Mi futuro carrito</h1>
                        {carro && products.map(product => 
                            <div className="item-row" key={product.item.id} >
                                <ul>
                                    <li>{ product.item.title}</li>
                                    <li>Precio unidad: $ { product.item.price}</li> 
                                    <li>Cantidad: {product.quantity}</li> 
                                    {/*esto esta pendiente
                                    <li><ItemCount stock={5} initial={0} } /></li>
                                    */}
                                    <li>$ { product.quantity * product.item.price}</li> 
                                    <li> <button onClick={()=>{removeItem(product.item.id)}}>Eliminar producto</button></li>
                                </ul>
                            </div>
                        )}
                        <div className="section-limpiar">
                            <button onClick={()=>{clear()}}>Limpiar todo</button>
                        </div>
                    </div>


                </div>
            </div>

        </main>

    )
}