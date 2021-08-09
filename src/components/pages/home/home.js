import React, {useEffect, useState} from 'react'
import {ItemList} from '../../itemList/itemList.js'
import { Link } from 'react-router-dom'
import { getFirestore } from '../../../firebase/firebase';
import {Loader} from '../../loader/loader'


export function Home() {
    const [cargaProductos, setCargaProductos] = useState(undefined)
    const [cargaCategories, setCargaCategories]  = useState(undefined)
    const bannerUrl = 'https://res.cloudinary.com/dgl0xcdwf/image/upload/v1628130244/shop/banner_hqaedb.jpg'; 


    const makeColletionArr = (colletion, collectionArr, stateFunc)=> {
        colletion.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) { 
                stateFunc(false)
                console.log(`No hay ${colletion}:`);
            } else {
                querySnapshot.forEach(doc => {
                    collectionArr.push({id: doc.id, ...doc.data()})
                });
                stateFunc(collectionArr);
            }
        }).catch((error) => {
            console.log(`Error en encontrar ${colletion}:`, error);
        })
    }

    useEffect(() => {

        let isMounted = true; 
        const db = getFirestore();
        const allProducts = db.collection('orangepaper-products');
        const colletionCat = db.collection('categories');
        const featuredProducts = allProducts.where('featured', '==', true);
        if (isMounted) {
            let cateogries = []
            let products = []
            makeColletionArr(colletionCat, cateogries, setCargaCategories )
            makeColletionArr(featuredProducts, products, setCargaProductos )
        } 

        return () => { isMounted = false }
    }, []);

    return (

        <main>
           { cargaCategories ?  (

            <>
            <section className="banner">
                <div className="container">
                    <img src={bannerUrl} style={ {width: '100%', borderRadius : '18px'} }/>
                </div>
            </section>
            <section className="categories">
                <div className="container">
                    <h2 className="section-title">Categorias</h2>
                    <div className="row">

                        {
                            cargaCategories.map(({slug, title, imageUrl, imageAlt})=>(
                                <div key={slug} className="col-4">
                                    <div id={slug} className="card card-featured-cat">
                                        <Link  to={`/cateogry/${slug}`}>
                                            <img className="card-fetaured-image" src={imageUrl} alt={imageAlt} />
                                        </Link>
                                        <div className="card-body">
                                            <Link  to={`/category/${slug}`}>
                                                <h4 className="card-fetaured-title">{title}</h4>
                                            </Link>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        }



                    </div>
                </div>


            </section>

            <section className="product-list">
                <h2 className="section-title">Destacados</h2>
                <div className="container">
                    <ItemList productos={cargaProductos} featured={true} />   
                </div>
            </section>
            
            </>
            ): (<Loader />)}
        </main>

    )
}
