// import {Link} from "react-router-dom";
// import { getFirestore } from '../../firebase/firebase';
// import { CartContext } from '../../context/cartContext.js';
// import { useContext, useEffect , useState} from 'react';


export const Order = ({bill}) => {

    return(
        <div className="card">
        <div className="card-body">
             <table>
                <tbody>
                    <tr>
                        <th>Orden</th>
                        <td>{bill.id}</td>
                    </tr>

                    <tr>
                        <th>Nombre Apellido</th>
                        <td>{bill.buyer.name} {bill.buyer.lastname}</td>
                    </tr>
                    <tr>
                        <th>Teléfono</th>
                        <td>{bill.buyer.phone}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{bill.buyer.email}</td>
                    </tr>
                </tbody>
            </table>     
                {console.log('Items bill', bill.items)}

               {
               /*
               * 🙃 Resolver: 
               * No logro que se Renderice el item!
               * Aunque si hace la iteración y muestra resultados por consola
               * */
               bill.items.map((item, index) => {<p key={index}>{item.title}</p>})}        
        </div>
    </div> 
    ) 
}
 