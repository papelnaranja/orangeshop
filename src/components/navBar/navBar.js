import logo from '../../images/logo-orange.svg';
import {CartWidget} from '../cartWidget/cartWidget';
import {NavLink, Link} from "react-router-dom";
import './navBar.scss';
import { useState } from 'react';



export const NavBar = ({categories}) => {


    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return <nav id="mainNavbar" className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand" ><img src={logo} alt="logo-orangepaper" width="150" height="80" className="brand-logo" /></Link>

                <div className={`navbar-wrap ${isOpen ? "show" : ''}`}>
                    <button onClick={toggleMenu} className={`btn-close`}><i className="icon-close"></i></button>
                    <ul className="navbar-nav">
                    
                        <li className="nav-item"><NavLink exact to='/' className="nav-link" activeClassName="active" >Inicio</NavLink></li>
                        {
                            categories.map( category => <li key={category.slug} className="nav-item"><NavLink  to={`/category/${category.slug}`} className="nav-link" activeClassName="active" >{category.name}</NavLink></li>)

                        }
                    </ul>
                </div>

                <ul className="navbar-utils">
                  
                    <li className="util-item">
                        <CartWidget />
                    </li>
                    <li className="util-item">
                        <button className="btn-menu" onClick={toggleMenu}><i className="icon-menu"></i></button>
                    </li>
                </ul>
            </div>
    </nav>
}
