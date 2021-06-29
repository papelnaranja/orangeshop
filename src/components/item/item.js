import React from 'react';
import {Link } from "react-router-dom";

export function Item({id, title, price, pictureUrl, pictureAlt , category}) {
    
    return(
        <div className="col-4">
            <div id={id} className="card card-featured-product">
                <img className="card-fetaured-image" src={pictureUrl} alt={pictureAlt} />
                <div className="card-body">
                    <h4 className="card-fetaured-title">{title}</h4>
                    <span className={`product-category category-${category}`}>{category}</span>
                    <p className="card-fetaured-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque similique fuga nesciunt quam tempora exercitationem.</p>   
                    <div className="card-fetaured-price">${price}</div>
                    <Link to={`/item/${id}`} className="btn btn-primary" >Ver detalle</Link>
                    
                    
                </div>
            </div>
        </div>

    );

}