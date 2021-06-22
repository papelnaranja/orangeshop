import logo from '../../images/logo-orange.svg';
import {CartWidget} from '../cartWidget/cartWidget';

import './navBar.scss';


export const NavBar = () => {
    return <nav id="mainNavbar" className="navbar">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="logo-orangepaper" width="150" height="80" className="brand-logo" />
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#">Libretas</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Lapices</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Laminas</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Stickers</a></li>
                </ul>
                <ul className="navbar-utils">
                    {/* <li className="util-item"><a href="#">User</a></li>
                    <li className="util-item"><a href="#">search</a></li> */}
                    <li className="util-item">
                        <CartWidget />
                    </li>
                    <li className="util-item"><a href="#" className="navabar-sm-menu"><i className="icon-menu"></i></a></li>
                </ul>
            </div>
    </nav>
}
