import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {ItemDetail} from '../itemDetail/itemDetail.js'
import firebase from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from '../../firebase/firebase';


export function ItemDetailContainer() {
    const [estadoItem, setEstadoItem ] = useState(undefined);
    const {itemId} = useParams(); 
    console.log('ItemId', itemId)


    useEffect(() => {
        const db = getFirestore();
        const allProducts = db.collection('orangepaper-products');
        //En caso de que exista la id la llama filtrada
        const product = allProducts.where('__name__', '==', itemId);

        product.get().then((querySnapshot) => {
            if(querySnapshot.size === 0 ) {  console.log('sin resultados') }
            querySnapshot.docs.map(doc => {
                setEstadoItem({id: doc.id, ...doc.data()});
            })
            
        }).catch((error) => {
            console.log('Error searching items', error);
        }).finally(()=> {
            console.log('Salir Firebase')
        })
        console.log('Detalle Producto:', estadoItem)

    }, []);





    return(
    <main>
        <div className="container">
            <ItemDetail  item={estadoItem} />
        </div>
    </main>
    );
}