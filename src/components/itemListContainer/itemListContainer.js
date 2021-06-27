import React, {useEffect, useState} from 'react'
import {ItemCount} from '../itemCount/itemCount.js'
import {ItemList} from '../itemList/itemList.js'
import {Item} from '../item/item.js'


export function ItemListContainer(props) {
    /* 
    * Corrección clase-6:
    * Moví la logica que estaba en itemList, a este archivo para pasar los productos como props.
    */
    const [cargaProductos, setCargaProductos] = useState('Cargando..')
    const productList = [{
            title: 'Producto 1',
            id: 'pro-01',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 01',
            price: '$50.000',
        },{
            title: 'Producto 2',
            id: 'pro-02',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 02',
            price: '$50.000',
        },{
            title: 'Producto 3',
            id: 'pro-03',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 03',
            price: '$50.000',
        },{
            title: 'Producto 4',
            id: 'pro-04',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 04',
            price: '$50.000',
        } ]

        /* Nota Para mi: Si no se pasa el segundo parametro de UseEffect va a continuar ejecutandose, la solución es pasar un array vacio */
        useEffect(() => {

            const callProductos = new Promise( (resolve, reject) => {
                setTimeout(function(){
                    resolve(productList);
                }, 2000); 
                
            })
            callProductos.then( 
                result => {
                    console.log(result)
                    setCargaProductos(
                        result.map(item => <Item key={item.id} id={item.id} title={item.title} pictureUrl={item.picture} pictureAlt={item.pictureAlt} price={item.price} />
                    )
                    );
                }, 
                err => {
                    alert('Hay un error, revisa la consola');
                    console.log(err);
                }
            )

        }, []);

    /* Corrección Clase-5:
    * onAdd se esta pasando como props 
    */
    const onAdd = () => {
        /* Por mientas esta función muestra un alert  */
        const counter = document.querySelector('#counter').value;
        if(counter > 0) {
            alert(`Garcias por tu compra!`);
        } else {
            alert(`Minimo 1 item para la compra`);
        }
    }

    return (

        /*
        * Esto se tiene que cambiar a un layout en algún momento 
        */
        <>
            <section className="home-slider">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1>{props.greeting}</h1>

                        </div>
                    </div>
                </div>
            </section>
            <section className="home-featured">
                <h2 className="section-title">Destacados</h2>
                <div className="container">
                    <ItemList productos={cargaProductos} />   


                </div>
            </section>
            <section className="temporal">
                <h2 className="section-title">Espacio temporal</h2>
                <div className="container">

                    <div className="card product-card">
                        <div className="row">
                            <div className="col-6">
                                <img src="https://picsum.photos/600" alt="descripcion" className="img-fluid"/>
                            </div>
                            <div className="col-6">
                                <ItemCount stock={0} initial={0} onAdd={onAdd} />

                            </div>

                        </div>
                    </div>
                </div>


            </section>

        </>

    )
}
