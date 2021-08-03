import React, {useState, useEffect} from 'react'
import './itemCount.scss';


export const ItemCount = ({stock, initial, onAdd, product, btnText = 'Agregar Producto'}) => {   
    
    const [cantidad, setCantidad] = useState(initial)
    const [disabled, setDisable] = useState(false)
    const handleChange = (e) =>{
        const inputCantidad = parseInt(e.target.value)

        if(inputCantidad >= stock) {
            setCantidad(stock)
        } else if (inputCantidad < initial) {
            setCantidad(initial)
        } else {
            setCantidad(inputCantidad)
        }       
    }

    const onDecrease = () =>{
        if(cantidad < 1 ) {
            setCantidad(0)
        } else {
            setCantidad(cantidad - 1)
        }
    }

    const onIncrease = () =>{
        if(cantidad >= stock ) {
            setCantidad(stock)
        } else {
            setCantidad(cantidad + 1)
        }
    }
    /* Si el stock al cargarse es 0, el botón se deshabilitará */
    useEffect(() => {
        if(cantidad === 0) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    },[cantidad])

    return(


        <div className="widget-conatador">
            {stock === 0 ? (<div className="alert"> ⛔ No hay stock disponible </div>) : 
                (   <>
                        <div className="contador">
                            <button  type="button" className="btn-count btn-minus" onClick={onDecrease}><i className="icon-minus"></i></button>
                            <input  type="number"  id="counter"  className="field field-counter" value={cantidad} onChange={handleChange} />
                            <button  type="button"  className="btn-count btn-plus" onClick={onIncrease}><i className="icon-plus"></i></button>
                        </div>
                        <button type="button" id="addToCar" className={'btn btn-secondary'} onClick={(event)=>{onAdd(cantidad, event, product)}} disabled={disabled}>{btnText}</button>
                    </>
                )
            }
        </div>
    );
}