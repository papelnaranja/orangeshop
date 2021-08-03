import React from 'react';
import {Item} from '../item/item.js'
import {Loader} from '../loader/loader'

export function ItemList({productos}) {
    switch (productos){
        case undefined:
            return(<Loader />)
        case false:
            return(
                <div className="card product-card">
                    <div className="card-body">
                     <p>Esta categoria no existe</p>
                    </div>
                </div>
            )
        default:
            return(
                <div className="row">
                    { productos.map( item => <Item key={item.id} id={item.id} title={item.title} pictureUrl={item.picture} pictureAlt={item.pictureAlt} price={item.price} cat={item.cat}  catName={item.catName}/> )}
                </div>
            )
    }
}
