import React from 'react';
import {Item} from '../item/item.js'
import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../../lotties/loader'

export function ItemList({productos}) {
    console.log()
    return (
        <>
            { productos ? (
                <div className="row">
                        
                    { productos.map( item => <Item key={item.id} id={item.id} title={item.title} pictureUrl={item.picture} pictureAlt={item.pictureAlt} price={item.price} category={item.cat}  /> )}
                </div>):(
                    <div className="loader-container">
                        <Player autoplay loop src={loader}style={{ height: '300px', width: '300px' }}></Player>
                    </div>
                
            )}
        </>

    )
}
