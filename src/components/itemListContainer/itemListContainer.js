
import {ItemCount} from '../itemCount/itemCount.js'
export function ItemListContainer(props) {
    //Acá va ir la Logica de los productos ? 
    return (
        <>
            <h1>{props.greeting}</h1>
            <ItemCount stock={5} initial={1} />
        </>
    )
}
