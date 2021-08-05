import './cart.scss';
import { CartContext } from '../../context/cartContext.js';
import { useContext, useState, useEffect } from 'react';
import { ItemCount } from '../itemCount/itemCount'
import { Link , Redirect} from "react-router-dom";
import fields from './fields.json'



export const Cart = ()=> {

    const {
        products, 
        removeItem, 
        clear, 
        modificadorProductos, 
        generateOrder, 
        orderId, 
        sumTotal,
        total,
        statusStock,
        setStatusStock
    } = useContext(CartContext)
    const [formData, setFormData] = useState(fields)
    const [orderStatus, setOrderStatus] = useState(false);

    let carro = false;
    if(products.length > 0) {
        carro = true;
    }

    const onAdd = (cantidad, event, product ) => {
        modificadorProductos(product.item, cantidad)
    }

    const updateOnInput = (key) => (event)=> {
        let nuevoDatos = {...formData};
        nuevoDatos[key].value = event.target.value;
        setFormData(nuevoDatos);
    }

    const renderMensajeError = (key) => {
        //En caso de necesitar más validaciones
        switch (key) {
            case 'correo':
                //aquí va la validación del correo
                break;
            case 'repetirCorreo':
                if(formData['correo'].value !== formData['repetirCorreo'].value  ) {
                    return formData['repetirCorreo'].error
                }
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isComplete = Object.values(formData).every((entry) => (entry.value !== ''))
        if(isComplete) {
            generateOrder(products, e)
            setOrderStatus(true);
        }
    }

    useEffect(()=>{setOrderStatus(false)}, [])
    useEffect(()=>{setStatusStock(undefined)}, [])
    useEffect(()=>{sumTotal(products)}, [products])

    if(orderStatus && orderId ){
        return(
            <>
                <Redirect to={`/order/${orderId}`} />
            </>
        )
    }

    if(statusStock !== undefined) {
        return (
            <main>
                <div className="container">
                    <h1>Algo salio mal 😐 </h1>
                    <div className="card">
                        <div className="card-body">
                            <p>El siguiente producto no tiene stock sufiente para hacer la compra</p>
                            <ul>
                            {console.log('statusStock:', statusStock)}
                            { statusStock.map(product => (  <li key={product.title}>{product.title}</li>)) }
                            </ul>
                            <p>Intenta nuevamente o ponte en contacto con la tienda</p>
                            <Link to="/" className="btn btn-secondary">Ir al inicio</Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
    
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

    if(carro) {
        return(
            <main>
                <div className="container">
                    <h1>Carro de compra</h1>
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
                                                    <a href="#" className="link" onClick={()=>{removeItem(product.item.id)}}>Eliminar producto</a>
                                                </div>
                                                
                                            </div>
                                        ) }
                                        <div className="section-total">
                                            <h3>Total: {total}</h3>
                                        </div>
                                        <div className="section-limpiar">
                                            <a href="#" className="btn btn-secondary-fade" onClick={()=>{clear()}}>Limpiar todo</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card formCard">
                                <div className="card-body">
                                    <h3>Información de compra</h3>
                                    <form method="post" onSubmit={handleSubmit}>
                                        {
                                            Object.entries(formData).map(([key, data]) => (
                                                <div key={key} className="form-group">
                                                    <label htmlFor={key}>{data.label}</label>
                                                    
                                                    <input type={data.type} name={key} placeholder={data.placeholder} onInput={updateOnInput(key)}required={data.required}/>
                                                    <span className="mensaje">{data.value ? renderMensajeError(key) : ''}</span>
                                                </div>
                                            ))
                                        }
                                        <div className="form-group">
                                            <button  name="realizarPedido" type="submit" className="btn btn-primary" >Realizar Pedido</button>
                                        </div>

                                    </form>

                                </div>


                            </div>
                            

                            
                        </div>
                    
                    </div> 
        
                </div>
            </main>
        )
    }

}

