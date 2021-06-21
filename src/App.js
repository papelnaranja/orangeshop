import './App.scss';
import {NavBar} from './components/navBar/navBar';
import {ItemListContainer} from './components/itemListContainer/itemListContainer';

export const App  = () => {
    const saludos = `Esta es mi nueva Tienda 🎀 📐`; 
    return (
        <div className="home">
            <NavBar />
            <main>
                <div className="container">
                    <ItemListContainer greeting={saludos}></ItemListContainer>
                </div>
            </main>

        </div>
    ) 
}
  

  