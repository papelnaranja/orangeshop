import './App.scss';
import {NavBar} from './components/navBar/navBar';
import {ItemListContainer} from './components/itemListContainer/itemListContainer';
import {ItemDetailContainer} from './components/itemDetailContainer/itemDetailContainer';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

const saludos = `Esta es mi nueva Tienda 🎀 📐`; 

/*
* Nota:
* Tuve que mover productList para poder usar el mismo conjunto en las diferenctes categorias y items
*/
const productList = [{
        title: 'Producto 1',
        id: 'pro-01',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 01',
        price: 5000,
        cat: 'marcadores',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },{
        title: 'Producto 2',
        id: 'pro-02',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 02',
        price: 2000,
        cat: 'marcadores',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },{
        title: 'Producto 3',
        id: 'pro-03',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 03',
        price: 300,
        cat: 'stickers',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },{
        title: 'Producto 4',
        id: 'pro-04',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 04',
        price: 6000,
        cat: 'marcadores',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },
    {
        title: 'Producto 5',
        id: 'pro-05',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 05',
        price: 5000,
        cat: 'marcadores',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },{
        title: 'Producto 6',
        id: 'pro-06',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 06',
        price: 2000,
        cat: 'stickers',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },{
        title: 'Producto 7',
        id: 'pro-07',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 07',
        price: 300,
        cat: 'stickers',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'
    },{
        title: 'Producto 8',
        id: 'pro-08',
        picture: 'https://picsum.photos/300/200',
        pictureAlt: 'producto 08',
        price: 6000,
        cat: 'marcadores',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.'

    }

]

export const App  = () => {
    
    
    return (
        <>
            <Router>
                <NavBar productList={productList}/>
                <Switch>
                    <Route exact path="/">
                        <ItemListContainer greeting={saludos} productList={productList}/>
                    </Route>
                    <Route path="/category/:categoryId" >
                        <ItemListContainer productList={productList} />
                    </Route>
                    <Route path="/item/:itemId">
                        <ItemDetailContainer productList={productList}/>
                    </Route>
                </Switch>
            </Router>
        </>
    ) 
}