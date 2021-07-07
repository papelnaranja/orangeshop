import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './App';
import {CartProvider} from './context/cartContext'


ReactDOM.render(
  <React.StrictMode>
    {
    /*
    * Nota para mi:
    * El CartProvider permite que el contexto quede disponible para los hijos (sigue el ejemplo app.js)
    * se puede envolver varios provaider entre si <OtroProv><CartProv><App/></cartProv></OtroProv>
    */
    }
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

