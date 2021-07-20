import React, {useEffect, useState} from 'react'
import {ItemList} from '../itemList/itemList.js'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../firebase/firebase';



export function ItemListContainer({greeting, productList}) {
    const {categoryId} = useParams();
    const [cargaProductos, setCargaProductos] = useState(undefined)


    //crea el array de productos desde la collection de firebase
    const makeProductArray = (productColletion)=> {
        productColletion.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) {  console.log('sin resultados') }
            let products = []
            querySnapshot.forEach(doc => products.push({id: doc.id, ...doc.data()}));
            setCargaProductos(products);
        }).catch((error) => {
            console.log('Error searching items', error);
        }).finally(()=> {
            console.log('Cerrar producto filtrado')
        })
    }

    useEffect(() => {
        //En caso de que exista una categoría se hace la llamada filtrada
        if(categoryId) {
            const db = getFirestore();
            const allProducts = db.collection('orangepaper-products');
            const categories = allProducts.where('cat', '==', categoryId);
            makeProductArray(categories)
        } else {
            //Si no se muestran todos los porductos
            setCargaProductos(productList);

        }

    }, [categoryId]);
    console.log('Get products Firebase', cargaProductos )

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
                    */
                    }
                    <ItemList productos={cargaProductos} />   


                </div>
            </section>
        </main>

    )
}
