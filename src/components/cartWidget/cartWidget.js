import './cartWidget.scss';
import {Link} from "react-router-dom";
let items = 3

export const CartWidget = () => {
    return <Link to="/" id="cartWidget" className="navabar-cart"><i className="icon-shop-bag"></i><span className="cart-count">{items}</span></Link>
}