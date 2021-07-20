import React, {useState, useContext} from 'react'
import {ItemCount} from '../itemCount/itemCount.js'
import './itemDetail.scss'
import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../../lotties/loader'
import {Link} from "react-router-dom";
import { CartContext } from '../../context/cartContext.js';


// este item se debe llamar en itemDetailContainer
export function ItemDetail({item}) {

    const [agregado , setAgregado] = useState('');

    // Funcion del conxtexto 
    const {modificadorProductos } = useContext(CartContext);
    
    const onAdd = (cantidad, event) => {
        if(cantidad > 0) {
           const widget = document.querySelector('.widget-conatador')
           setAgregado(cantidad);
           //limpio el dato antes de llegar al contexto
           modificadorProductos(item, cantidad);
           event.target.classList.add('hide')
           widget.classList.add('hide')
        } else {
            alert(`⚠️ Minimo 1 item para la compra`);
        }
    }

    return (
        <>
            { item ? (

                <div className="card product-card">
                    <div className="row">
                        <div className="col-6">
                            <img src={item.picture} alt="descripcion" className="img-fluid"/>
                        </div>
                        <div className="col-6">
                            <h1>{item.title}</h1>
                            <span className={`product-category category-${item.cat}`}>{item.cat}</span>
                            <p className="price">${item.price}</p>
                            <p>{item.description}</p>
                        
                            <ItemCount stock={item.stock} initial={0} onAdd={onAdd} />
                            { agregado ? (<Link to="/cart" id="btnFinish" className="btn btn-primary">Terminar Compra</Link>) : ''}
                            

                        </div>

                    </div>
                </div>
                                
                ):(
                <div className="loader-container">
                    <Player autoplay loop src={loader}style={{ height: '300px', width: '300px' }}></Player>
                </div>
            )}
        </>

    )

}