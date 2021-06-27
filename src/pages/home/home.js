import {ItemListContainer} from '../../components/itemListContainer/itemListContainer';

export const Home  = () => {
    const saludos = `Esta es mi nueva Tienda 🎀 📐`; 
    return (
        <main>
            <ItemListContainer greeting={saludos}></ItemListContainer>
        </main>
    ) 
} 