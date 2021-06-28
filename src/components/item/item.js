import React from 'react';


export function Item({id, title, price, pictureUrl, pictureAlt }) {
    return(
        <div className="col-4">
            <div id={id} className="card card-featured-product">
                <img className="card-fetaured-image" src={pictureUrl} alt={pictureAlt} />
                <div className="card-body">
                    <h4 className="card-fetaured-title">{title}</h4>
                    <p className="card-fetaured-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque similique fuga nesciunt quam tempora exercitationem.</p>   
                    <div className="card-fetaured-price">${price}</div>
                    <a href="#" className="btn btn-primary">Ver detalle</a>
                    
                </div>
            </div>
        </div>

    );

}