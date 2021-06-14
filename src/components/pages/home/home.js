import './home.scss';
import {NavBar} from '../../navBar/navBar';
import {ItemListContainer} from '../../itemListContainer/itemListContainer';

export const Home= () => {
    const saludos = `Esta es mi nueva Tienda 🎀 📐`; 
    return (
        <div className="home">
            <NavBar />
            <div className="container">
                <ItemListContainer greeting={saludos}></ItemListContainer>

            </div>

        </div>
    ) 
}
  

  