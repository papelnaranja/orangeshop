import React from 'react'
import {ItemCount} from '../itemCount/itemCount.js'

/* este item se debe llamar en item detailContainer */

export function ItemDetail({ itemImage, itemName, itemPrice, itemDesc, onAdd }) {
    return <>
    <div className="container">
        <div className="card product-card">
            <div className="row">
                <div className="col-6">
                    <img src={itemImage} alt="descripcion" className="img-fluid"/>
                </div>
                <div className="col-6">
                    <h1>{itemName}</h1>
                    <span className="price">{itemPrice}</span>
                    <p>{itemDesc}</p>
                
                    <ItemCount stock={5} initial={0} onAdd={onAdd} />

                </div>

            </div>
        </div>
    </div>
    </>;
}