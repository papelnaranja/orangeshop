import logo from '../../images/logo-orange.svg'
import './navBar.scss';
let items = 3

export const NavBar = () => {
    return <nav className="navbar mainNavbar">
        <div className="container">
            <a className="navbar-brand" href="/index">
                <img src={logo} alt="logo-orangepaper" width="150" height="80" />
            </a>

            <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" href="#">Libretas</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Lapices</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Laminas</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Stickers</a></li>
            </ul>
            <ul className="navbar-utils">
                <li class="util-item"><a href="#">User</a></li>
                <li class="util-item"><a href="#">search</a></li>
                <li class="util-item"><a href="#" className="navabar-cart">cart<span className="cart-count">{items}</span></a></li>
            </ul>

        </div>
    </nav>
}