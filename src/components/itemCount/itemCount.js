import React, {useState} from 'react'
import './itemCount.scss';
/*
*
* A diferencia del ejemplo que sale en el ejercicio, no use onAdd como props 
* porque lo estoy ejecutando como función al evento click del botón Añadir.
*
*/
export const ItemCount = ({stock, initial}) => {   
    
    const [cantidad, setCantidad] = useState(initial)

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
    const onAdd = () => {
        /* Por algún motivo, que aun no entiendo la consola siempre me mustra -1 elementos al valor actual de cantidad */
        console.log(cantidad)
        if(cantidad > stock) {
            setCantidad(stock)
            // Doble check, esto no se debería ver
            alert(`solo tenemos ${stock} de este producto, se agregara ese valor`)
        } else if (cantidad < initial) {
             // Doble check, esto no se debería ver
            alert(`El valor minimo de producto es ${initial}`)
        } else {
            alert(`📢 Se agregaron ${cantidad} productos al carro. Próximamente se mostrá en la parte superior`);
        } 
    }

    return(
        <div className="widget-conatador">
            <div className="contador">
                <button  type="button" className="btn-count btn-minus" onClick={onDecrease}><i className="icon-minus"></i></button>
                <input  type="number"  id="counter"  className="field field-counter" value={cantidad} onChange={handleChange} />
                <button  type="button"  className="btn-count btn-plus" onClick={onIncrease}><i className="icon-plus"></i></button>
            </div>
            <button type="button" className="btn btn-primary" onClick={onAdd}>Añadir Producto</button>
        </div>
    );
}