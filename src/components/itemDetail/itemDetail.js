import React, {useState, useContext} from 'react'
import {ItemCount} from '../itemCount/itemCount.js'
import './itemDetail.scss'
import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../../lotties/loader'
import {Link} from "react-router-dom";
import { CartContext } from '../../context/cartContext.js';


// este item se debe llamar en itemDetailContainer
export function ItemDetail({items}) {

    const [agregado , setAgregado] = useState('');

    // Funcion del conxtexto 
    const {modificadorProductos } = useContext(CartContext);
    
    const onAdd = (cantidad, event) => {
        if(cantidad > 0) {
           setAgregado(cantidad);
           modificadorProductos(items, cantidad);
           event.target.classList.add('hide')

        } else {
            alert(`⚠️ Minimo 1 item para la compra`);
        }
    }

    return (
        <>
            { items ? (

                <div className="card product-card">
                    <div className="row">
                        <div className="col-6">
                            <img src={items[0].picture} alt="descripcion" className="img-fluid"/>
                        </div>
                        <div className="col-6">
                            <h1>{items[0].title}</h1>
                            <span className={`product-category category-${items[0].cat}`}>{items[0].cat}</span>
                            <p className="price">${items[0].price}</p>
                            <p>{items[0].description}</p>
                        
                            <ItemCount stock={5} initial={0} onAdd={onAdd} />
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