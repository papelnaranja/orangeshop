import './App.scss';
import {NavBar} from './components/navBar/navBar';
import {ItemListContainer} from './components/itemListContainer/itemListContainer';
import {ItemDetailContainer} from './components/itemDetailContainer/itemDetailContainer';
import {Home} from './components/pages/home/home';
import {Footer} from './components/footer/footer'
import {NoMatch} from './components/noMatch/noMatch.js';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Cart} from './components/cart/cart';
import {Order} from './components/order/order';

export const App  = () => {


    return (

                <Router>
                    <NavBar />
                    <Switch>
                        <Route exact path="/">
                            <Home/> 
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
                    <Footer/>
                </Router>
 
            
    ) 
}