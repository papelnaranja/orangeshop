import React, {useState, useEffect} from 'react'
import {ItemDetail} from '../itemDetail/itemDetail.js'

export function ItemDetailContainer({onAdd}) {
    const [estadoItem, setEstadoItem ] = useState('Cargando producto...');

    const produtctoTemporal = {
        nombre: 'Set Marcadores Pastel',
        imagen: 'https://picsum.photos/500/300',
        precio: 100,
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis quos rem molestiae cum veniam iste, ipsam animi nihil! Eligendi commodi aut quisquam laborum porro dolore doloribus blanditiis molestiae reiciendis.' 
    }
    useEffect(() => {
        const getItems = new Promise( (resolve, reject) => {
            setTimeout(function(){
                resolve(produtctoTemporal)
            }, 2000); 
            
        })
        getItems.then(
            result => {
                console.log(result)
                setEstadoItem(<ItemDetail itemImage={result.imagen} itemName={result.nombre} itemDesc={result.descripcion} itemPrice={result.precio} onAdd={onAdd} />)
                
            }, 
            err => {
                alert('Hay un error, revisa la consola');
                console.log(err);
            }
        )
        
            

    }, []);

   

    return(
    <>
        {estadoItem}
    </>
    );
}