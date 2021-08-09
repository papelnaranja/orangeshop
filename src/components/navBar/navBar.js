import logo from '../../images/logo-orange.svg';
import {CartWidget} from '../cartWidget/cartWidget';
import {NavLink, Link} from "react-router-dom";
import './navBar.scss';
import { useState , useEffect} from 'react';
import {getFirestore} from '../../firebase/firebase';


export const NavBar = () => {
    const [categories,  setCategories] = useState(undefined)
    const [isOpen, setIsOpen] = useState(false)


    useEffect(()=>{
        let isMounted = true; 
        const db = getFirestore();
        const itemColletion = db.collection('categories');
        itemColletion.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) {
                console.log('Sin resultados')
            }
            let misCategorias = [];
            querySnapshot.forEach(doc => {
                misCategorias.push({slug: doc.data().slug, name: doc.data().title})
            } );
            if(isMounted) {
                setCategories(misCategorias)
            }
        })
        .catch(error => console.log('Error searching items', error) )
        .finally(()=> console.log('Cerrar Consulta de productos y categorias'))
        return () => { isMounted = false }
    },[])


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
        { categories ? (
            <nav id="mainNavbar" className="navbar">
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
            ):('')
        }
        </>
    )
}
