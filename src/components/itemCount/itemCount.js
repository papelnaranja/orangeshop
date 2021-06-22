import React, {useState, useEffect} from 'react'
import './itemCount.scss';
/*
*
* A diferencia del ejemplo que sale en el ejercicio, no use onAdd como props 
* porque lo estoy ejecutando como función al evento click del botón Añadir.
*
*/
export const ItemCount = ({stock, initial, onAdd}) => {   
    
    const [cantidad, setCantidad] = useState(initial)
    const [habilitado, setHabilitado] = useState(false)


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
        if(cantidad <= initial ) {
            setCantidad(initial)
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
        if(stock == 0) {
            setHabilitado(true);
        }
    },[])


    return(
        <div className="widget-conatador">
            <div className="contador">
                <button  type="button" className="btn-count btn-minus" onClick={onDecrease}><i className="icon-minus"></i></button>
                <input  type="number"  id="counter"  className="field field-counter" value={cantidad} onChange={handleChange} />
                <button  type="button"  className="btn-count btn-plus" onClick={onIncrease}><i className="icon-plus"></i></button>
            </div>
            <button type="button" id="addToCar" className="btn btn-secondary" onClick={onAdd} disabled={habilitado}>Añadir Producto</button>
        </div>
    );
}