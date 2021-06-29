import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {ItemDetail} from '../itemDetail/itemDetail.js'

export function ItemDetailContainer({productList}) {
    const [estadoItem, setEstadoItem ] = useState(undefined);
    const {itemId} = useParams(); 

    const onAdd = () => {
        /* Por mientas esta función muestra un alert  */
        const counter = document.querySelector('#counter').value;
        if(counter > 0) {
            alert(`✅ Garcias por tu compra!`);
        } else {
            alert(`⚠️ Minimo 1 item para la compra`);
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
               
                setEstadoItem(result.filter(item => item.id == itemId))

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
            <ItemDetail  items={estadoItem} onAdd={onAdd} />
        </div>
    </main>
    );
}