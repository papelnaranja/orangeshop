import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {ItemDetail} from '../itemDetail/itemDetail.js'

export function ItemDetailContainer({productList}) {
    const [estadoItem, setEstadoItem ] = useState('Cargando producto...');

    const {itemId} = useParams(); 
    console.log('productlist:',productList)
    console.log('itemId:',itemId)

    const onAdd = () => {
        /* Por mientas esta función muestra un alert  */
        const counter = document.querySelector('#counter').value;
        if(counter > 0) {
            alert(`Garcias por tu compra!`);
        } else {
            alert(`Minimo 1 item para la compra`);
        }
    }

    useEffect(() => {
        const getItems = new Promise( (resolve, reject) => {
            setTimeout(function(){
                //resolve(produtctoTemporal)
                resolve(productList)
            }, 2000); 
            
        })
        getItems.then(
            result => {
                const item = result.filter(item => item.id == itemId)
                setEstadoItem(
                    <ItemDetail key={item[0].id} itemImage={item[0].picture} itemCat={item[0].cat} itemName={item[0].title} itemDesc={item[0].description} itemPrice={item[0].price} onAdd={onAdd} />

                )

            }, 
            err => {
                alert('Hay un error, revisa la consola');
                console.log(err);
            }
        )
    
    }, []);

   

    return(
    <main>
        <div className="container">
            {estadoItem}
        </div>
    </main>
    );
}