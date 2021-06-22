import React, {useEffect, useState} from 'react';
import {Item} from '../item/item.js'

export function ItemList() {
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
                    /* 
                    * Pregunta Tutor 1:
                    * Tengo dudas sobre si esta es la manera correcta de realizar el llamado o si existe alguna forma mejor.
                    */
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


    return (
        <>
            <div className="row">
                {cargaProductos}
            </div>
        </>

    )

}