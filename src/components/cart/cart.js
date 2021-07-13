import './cart.scss';
import { CartContext } from '../../context/cartContext.js';
import { useContext, useState, useEffect } from 'react';
import { ItemCount } from '../itemCount/itemCount'
import { Link } from "react-router-dom";


export const Cart = ()=> {
    const {products, removeItem, clear, modificadorProductos} = useContext(CartContext)
    const [total, setTotal] = useState(undefined);
    let carro = false;
    if(products.length > 0) {
        carro = true;
    }
    const onAdd = (cantidad, event, product ) => {
        console.log('cantidad', cantidad)
        console.log('event:', event)
        console.log('onAdd product:', product)
        console.log('onAdd product id:', product.item.id )
        modificadorProductos(product.item, cantidad)
    }

    const sumTotal= (products) => {
        let number = 0;
        products.map(product => number += product.quantity * product.item.price)
        return setTotal(number);
        
    }

   useEffect(()=>{sumTotal(products)}, [products])

    return(
        <main>
            <div className="container">
                <h1>Carro de compra</h1>
                {!carro ? 
                    <div className="card">
                        <div className="card-body">
                            <p>Actualmente esta vacio, busca algo en la tienda</p>
                            <Link to="/" className="btn btn-secondary">Ir al inicio</Link>
                        </div>
                    </div> : 
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
                                                                <ItemCount stock={5} initial={ product.quantity } onAdd={onAdd} product={product} btnText={"Modificar Cantidad"}/>
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
                                    <form action="" method="post">
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
                                            <button type="submit" className="btn btn-primary">Realizar Pedido</button>
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