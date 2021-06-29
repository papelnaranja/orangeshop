import React from 'react'
import {ItemCount} from '../itemCount/itemCount.js'

/* este item se debe llamar en itemDetailContainer */

export function ItemDetail({ itemImage, itemName, itemPrice, itemDesc, onAdd, itemCat }) {
    return <div className="card product-card">
            <div className="row">
                <div className="col-6">
                    <img src={itemImage} alt="descripcion" className="img-fluid"/>
                </div>
                <div className="col-6">
                    <h1>{itemName}</h1>
                    <span className={`product-category category-${itemCat}`}>{itemCat}</span>
                    <p className="price">${itemPrice}</p>
                    <p>{itemDesc}</p>
                
                    <ItemCount stock={5} initial={0} onAdd={onAdd} />

                </div>

            </div>
        </div>
}