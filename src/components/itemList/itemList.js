import React from 'react';

export function ItemList({productos}) {
   

    return (
        <>
            <div className="row">
                {productos}
            </div>
        </>

    )

}