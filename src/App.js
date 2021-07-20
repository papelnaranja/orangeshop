import './App.scss';
import {NavBar} from './components/navBar/navBar';
import {ItemListContainer} from './components/itemListContainer/itemListContainer';
import {ItemDetailContainer} from './components/itemDetailContainer/itemDetailContainer';
import {NoMatch} from './components/noMatch/noMatch.js';
import {Order} from './components/order/order'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { Cart } from './components/cart/cart';
import { getFirestore } from './firebase/firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../src/lotties/loader'


const saludos = `Esta es mi nueva Tienda 🎀 📐`; 


export const App  = () => {
    const [categories,  setCategories] = useState(undefined)
    const [productList, setProductList] = useState(undefined)


     /*
    * 🐢 Pendinete:
    * Moverlo al ItemListContainer
    */
    useEffect(()=>{
        const db = getFirestore();
        const itemColletion = db.collection('orangepaper-products');

        itemColletion.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) {
                console.log('Sin resultados')
            }
            let misCategorias = new Set();
            let productos = [];
            querySnapshot.forEach(doc => {
                misCategorias.add(doc.data().cat)
                productos.push({id: doc.id, ...doc.data()})
            } );
            setProductList(productos)
            setCategories(Array.from(misCategorias))
            console.log('Categorias:', categories)
        })
        .catch(error => console.log('Error searching items', error) )
        .finally(()=> console.log('Cerrar Consulta de productos y categorias'))
    },[])

    
    /*
    * El hook tienen que ir dentro de app o va fallar.
    * Se importa la fn de React useContext, para usar el contexto
    * Se importa la fn personalizada, CartContext en nuestro caso
    * Luego se le pasa fn custom a UseContext y se puede usar 
    * 
    * 
    * const testiando = useContext(CartContext);
    * console.log('testiando', testiando);
    */

    return (
        <>
            {categories ? (
                <Router>
                    <NavBar categories={categories}/>
                    <Switch>
                        <Route exact path="/">
                            <ItemListContainer greeting={saludos} productList={productList}/>
                        </Route>
                        <Route path="/category/:categoryId" >
                            <ItemListContainer  />
                        </Route>
                        <Route path="/item/:itemId">
                            <ItemDetailContainer />
                        </Route>
                        <Route path="/cart">
                            <Cart/>
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </Router>
                ) : ( 
                <div className="loader-container">
                    <Player autoplay loop src={loader}style={{ height: '300px', width: '300px' }}></Player>
                </div>
                )}
                
            
        </>
    ) 
}