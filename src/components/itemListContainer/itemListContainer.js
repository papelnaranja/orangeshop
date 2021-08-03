import React, {useEffect, useState} from 'react'
import {ItemList} from '../itemList/itemList.js'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../firebase/firebase';



export function ItemListContainer({greeting, productList}) {
    const {categoryId} = useParams();
    const [cargaProductos, setCargaProductos] = useState(undefined)
    const [categoryName, setCategoryName]  = useState(undefined)
    //crea el array de productos desde la collection de firebase
    const makeProductArray = (productColletion)=> {
        productColletion.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) { 
                 //console.log('sin resultados') 
                setCargaProductos(false)
            } else {
                let products = []
                let catName = new Set();
                querySnapshot.forEach(doc => {
                    products.push({id: doc.id, ...doc.data()})
                    catName.add(doc.data().catName)
                });
                setCargaProductos(products);
                setCategoryName(catName)
            }

        }).catch((error) => {
            //console.log('Error searching items', error);
        }).finally(()=> {
            //console.log('Cerrar producto filtrado')
        })
    }

    useEffect(() => {

        let isMounted = true; 
        //En caso de que exista una categoría se hace la llamada filtrada
        if(categoryId) {
            const db = getFirestore();
            const allProducts = db.collection('orangepaper-products');
            const categories = allProducts.where('cat', '==', categoryId);
            if (isMounted) {makeProductArray(categories)} 
        } else {
            //Si no se muestran todos los porductos
            if (isMounted) {setCargaProductos(productList);}             
        }
        return () => { isMounted = false }
    }, [categoryId]);
    //console.log('Get products Firebase', cargaProductos )

    return (

        <main>
            
            <section className="home-slider">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">{ categoryId ? categoryName : greeting}</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-featured">
                <h2 className="section-title">{ categoryId ? 'Catalogo' : 'Todos los productos'}</h2>
                <div className="container">
                    <ItemList productos={cargaProductos} />   
                </div>
            </section>
        </main>

    )
}
