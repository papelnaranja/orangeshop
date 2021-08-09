import React from 'react';
import {Item} from '../item/item.js'
import {Loader} from '../loader/loader'

export function ItemList({productos, featured}) {
    let isFeatured = false;
    if(featured) {
        isFeatured = featured
    }
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
                    { productos.map( ({id, cat, catName, title, picture, pictureAlt, price}) => (
                            isFeatured ? ( 
                                <div  key={id} className="col-3">
                                    <Item id={id} featured={true} title={title} pictureUrl={picture} pictureAlt={pictureAlt} price={price} cat={cat}  catName={catName}/> 
                                </div>  ):( 
                                <div key={id} className="col-4">
                                    <Item id={id} featured={false} title={title} pictureUrl={picture} pictureAlt={pictureAlt} price={price} cat={cat}  catName={catName}/> 
                                </div>  
                                )
                        ))}
                </div>
            )
    }
}
