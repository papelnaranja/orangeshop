import logo from '../../images/logo-orange.svg';
import {CartWidget} from '../cartWidget/cartWidget';
import {NavLink, Link} from "react-router-dom";
import './navBar.scss';


export const NavBar = ({productList}) => {
    
    const categories = productList.map(item => item.cat)
    const unique = [...new Set(categories)]

    return <nav id="mainNavbar" className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand" ><img src={logo} alt="logo-orangepaper" width="150" height="80" className="brand-logo" /></Link>

                <ul className="navbar-nav">
                
                    <li className="nav-item"><NavLink exact to='/' className="nav-link" activeClassName="active" >Inicio</NavLink></li>
                    {
                        unique.map( catName => <li key={catName} className="nav-item"><NavLink  to={`/category/${catName}`} className="nav-link" activeClassName="active" >{catName}</NavLink></li>)

                    }
                </ul>
                <ul className="navbar-utils">
                  
                    <li className="util-item">
                        <CartWidget />
                    </li>
                    <li className="util-item">
                        <Link to="/" className="navabar-sm-menu"><i className="icon-menu"></i></Link>
                    </li>
                </ul>
            </div>
    </nav>
}
