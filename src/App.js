import './App.scss';
import {NavBar} from './components/navBar/navBar';
import {ItemListContainer} from './components/itemListContainer/itemListContainer';
import {ItemDetailContainer} from './components/itemDetailContainer/itemDetailContainer';
import {NoMatch} from './components/noMatch/noMatch.js';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Cart} from './components/cart/cart';
import {Order} from './components/order/order';
// import { CartContext } from './context/cartContext.js';
import {getFirestore} from './firebase/firebase';
import {useEffect, useState} from 'react';
import {Loader} from './components/loader/loader'



export const App  = () => {
    const [categories,  setCategories] = useState(undefined)
    const [productList, setProductList] = useState(undefined)
    const bannerUrl = 'https://res.cloudinary.com/dgl0xcdwf/image/upload/v1628130244/shop/banner_hqaedb.jpg'; 


    /* Hace la llamda para la categorías del menu y 
    * para todos los productos que se mostrarán en el home */
    useEffect(()=>{
        let isMounted = true; 
        const db = getFirestore();
        const itemColletion = db.collection('orangepaper-products');

        itemColletion.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) {
                console.log('Sin resultados')
                if(isMounted) {
                    setProductList(false)
                }
            }
            //let misCategorias = new Set();
            let misCategorias = []
            let productos = [];
            querySnapshot.forEach(doc => {
                //misCategorias.add(doc.data().catName)
                const isRepeted = misCategorias.some((item) => (item.slug === doc.data().cat))
                if(!isRepeted) {
                    misCategorias.push({slug: doc.data().cat, name: doc.data().catName})
                }
                productos.push({id: doc.id, ...doc.data()})
            } );
            if(isMounted) {
                setProductList(productos)
                //setCategories(Array.from(misCategorias))
                setCategories(misCategorias)
            }
            //console.log('Categorias:', categories)
        })
        .catch(error => console.log('Error searching items', error) )
        .finally(()=> console.log('Cerrar Consulta de productos y categorias'))
        return () => { isMounted = false }
    },[])


    return (
        <>
            { categories ? (
                <Router>
                    <NavBar categories={categories}/>
                    <Switch>
                        <Route exact path="/">
                            <ItemListContainer banner={bannerUrl} productList={productList}/>
                        </Route>
                        <Route path="/category/:categoryId" >
                            <ItemListContainer  />
                        </Route>
                        <Route path="/item/:itemId">
                            <ItemDetailContainer />
                        </Route>
                        <Route path="/order/:orderId">
                            <Order/>
                        </Route>

                        <Route path="/cart">
                            <Cart/>
                        </Route>

                        <Route path="*">
                            <NoMatch mensaje="Esta ruta no existe" />
                        </Route>
                    </Switch>
                </Router>
                ) : (<Loader />)
            }
                
            
        </>
    ) 
}