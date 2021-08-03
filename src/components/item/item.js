import React from 'react';
import {Link } from "react-router-dom";

export function Item({id, title, price, pictureUrl, pictureAlt , cat, catName }) {
    
    return(
        <div className="col-4">
            <div id={id} className="card card-featured-product">
                <img className="card-fetaured-image" src={pictureUrl} alt={pictureAlt} />
                <div className="card-body">
                    <h4 className="card-fetaured-title">{title}</h4>
                    <span className={`product-category category-${cat}`}>{catName}</span>
                    <p className="card-fetaured-description"></p>   
                    <div className="card-fetaured-price">${price}</div>
                    <Link to={`/item/${id}`} className="btn btn-primary" >Ver detalle</Link>
                    
                    
                </div>
            </div>
        </div>

    );

}