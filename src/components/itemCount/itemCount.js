import React, {useState, useEffect} from 'react'
import './itemCount.scss';


export const ItemCount = ({stock, initial, onAdd}) => {   
    
    const [cantidad, setCantidad] = useState(initial)
    const [habilitado, setHabilitado] = useState(false)


    const handleChange = (e) =>{
        const inputCantidad = parseInt(e.target.value)


        /*Pregunta para el tutor:
        * Quiero que al cambiar el valor del input, se vuelva activar el botón de agregar al carrito 
        * Para esto tendría que mover esta función al contenedor padre ? o ¿se puede "escuchar" el onChange desde el padre, para poder re-redereizar?
        * 
        */
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
        if(stock === 0 || cantidad === 0) {
            setHabilitado(true);
        } else {
            setHabilitado(false);
        }
    },[cantidad])

    return(
        <div className="widget-conatador">
            <div className="contador">
                <button  type="button" className="btn-count btn-minus" onClick={onDecrease}><i className="icon-minus"></i></button>
                <input  type="number"  id="counter"  className="field field-counter" value={cantidad} onChange={handleChange} />
                <button  type="button"  className="btn-count btn-plus" onClick={onIncrease}><i className="icon-plus"></i></button>
            </div>
            {/* Nota para mi: 
            * Si a OnClick no se le pasa la función onAdd dentro de otra función se ejecuta al cargar la app y genera caos y no funciona nada
             */}
            <button type="button" id="addToCar" className={'btn btn-secondary'} onClick={(event)=>{onAdd(cantidad, event)}} disabled={habilitado}>Añadir Producto</button>
        </div>
    );
}