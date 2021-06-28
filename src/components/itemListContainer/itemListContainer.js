import React, {useEffect, useState} from 'react'
import {ItemList} from '../itemList/itemList.js'
import {Item} from '../item/item.js'
import {ItemDetailContainer} from '../itemDetailContainer/itemDetailContainer.js'

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
            price: 5000,
        },{
            title: 'Producto 2',
            id: 'pro-02',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 02',
            price: 2000,
        },{
            title: 'Producto 3',
            id: 'pro-03',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 03',
            price: 300,
        },{
            title: 'Producto 4',
            id: 'pro-04',
            picture: 'https://picsum.photos/300/200',
            pictureAlt: 'producto 04',
            price: 6000,
        } ]

        /* Nota Para mi: Si no se pasa el segundo parametro de UseEffect va a continuar ejecutandose, la solución es pasar un array vacio 
        * UseEffect Hook: Se ejecuta despues del pimer renderizado y despues de cada actualización
        */
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
                    {/* 
                    * Nota para mi:
                    * ItemList invoca una vista que tiene una fila, dentro de ella van los productos de CargaProducto.
                    * cargaProductos es el estado, que al usar el efecto, al resolverse llama a Item, con una serie de atributos.
                    * Item a su vez es la vista de cada uno de las tarjetas de productos 
                    */}
                    <ItemList productos={cargaProductos} />   


                </div>
            </section>
            <section className="temporal">
                <h2 className="section-title">Espacio temporal</h2>
                {/* 
                * Nota para mi:
                * La función onAdd esta pasando por 3 componentes antes de llegar al lugar donde se usa.
                * ItemDetailContainer => ItemDetail => ItemCount
                */}
                <ItemDetailContainer onAdd={onAdd}/>
              

            </section>

        </>

    )
}
