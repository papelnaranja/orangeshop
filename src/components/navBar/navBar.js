import logo from '../../images/logo-orange.svg';
import {CartWidget} from '../cartWidget/cartWidget';
import {NavLink, Link} from "react-router-dom";
import './navBar.scss';


export const NavBar = () => {
    return <nav id="mainNavbar" className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand" ><img src={logo} alt="logo-orangepaper" width="150" height="80" className="brand-logo" /></Link>

                <ul className="navbar-nav">
                
                    <li className="nav-item">
                        <NavLink exact to='/' className="nav-link" activeClassName="active" >Inicio</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to='/category/marcadores' className="nav-link" activeClassName="active" >Marcadores</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/category/stickers' className="nav-link" activeClassName="active" >Stickers</NavLink>
                    </li>
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
