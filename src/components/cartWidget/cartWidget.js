import './cartWidget.scss';
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext'

export const CartWidget = () => {
  const {cantidadCarro} = useContext(CartContext)

  return(
    <Link to="/cart" id="cartWidget" className="navabar-cart">
      <i className="icon-shop-bag"></i>
      { cantidadCarro ? <span className="cart-count">{ cantidadCarro }</span> : '' }  
    </Link>
  )
}