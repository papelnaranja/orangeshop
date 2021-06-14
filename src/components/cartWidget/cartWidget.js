import './cartWidget.scss';
let items = 3

export const CartWidget = () => {
    return <a href="#" id="cartWidget" className="navabar-cart"><i className="icon-shop-bag"></i><span className="cart-count">{items}</span></a>
}