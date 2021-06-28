import './App.scss';
import {NavBar} from './components/navBar/navBar';
//import {ItemListContainer} from './components/itemListContainer/itemListContainer';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Home} from './pages/home/home.js'

export const App  = () => {
    return (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    ) 
}