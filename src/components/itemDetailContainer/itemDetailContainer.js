import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {ItemDetail} from '../itemDetail/itemDetail.js'

export function ItemDetailContainer({productList}) {
    const [estadoItem, setEstadoItem ] = useState(undefined);
    const {itemId} = useParams(); 


    useEffect(() => {
        const getItems = new Promise( (resolve, reject) => {
            setTimeout(function(){
                //resolve(produtctoTemporal)
                resolve(productList)
            }, 10); 
            
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
            <ItemDetail  item={estadoItem} />
        </div>
    </main>
    );
}