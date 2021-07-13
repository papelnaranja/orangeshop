import React, {useEffect, useState} from 'react'
import {ItemList} from '../itemList/itemList.js'
import { useParams } from 'react-router-dom'
//import  {dataBase } from '../../firebase/firebase';


export function ItemListContainer({greeting, productList}) {

    const {categoryId} = useParams();
    console.log('category id:',categoryId)


    const [cargaProductos, setCargaProductos] = useState(undefined)

        /*
        * Nota Para mi:
        * Si no se pasa el segundo parametro de UseEffect va a continuar ejecutandose, la solución es pasar un array vacio 
        * UseEffect Hook: Se ejecuta despues del pimer renderizado y despues de cada actualización
        */
        useEffect(() => {

            const callProductos = new Promise( (resolve, reject) => {
                setTimeout(function(){
                    resolve(productList);
                }, 10); 
                
            })
            callProductos.then( 
                result => {
                    if(categoryId !== undefined) {
                      
                        setCargaProductos(
                            result.filter( item => item.cat == categoryId )
                        );
                    } else {
                        setCargaProductos(result);
                    }

                }, 
                err => {
                    alert('Hay un error, revisa la consola');
                    console.log(err);
                }
            )

        }, [categoryId]);

    return (

        /*
        * Esto se tiene que cambiar a un layout en algún momento 
        */
        <main>
            <section className="home-slider">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">{ categoryId ? categoryId.toUpperCase() : greeting}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-featured">
                <h2 className="section-title">{ categoryId ? 'Catalogo' : 'Productos destacados'}</h2>
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
        </main>

    )
}
