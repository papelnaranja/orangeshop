
import {ItemCount} from '../itemCount/itemCount.js'
import {ItemList} from '../itemList/itemList.js'

export function ItemListContainer(props) {
    //Acá va ir la Logica de los productos ? 

    const onAdd = () => {
        /* Por mientas esta función muestra un alert  */
        const counter = document.querySelector('#counter').value;
        if(counter > 0) {
            alert(`Garcias por tu compra!`);
        } else {
            alert(`Minimo 1 item para la compra`);
        }
    }

    return (

        /*
        * Esto se tiene que cambiar a un layout en algún momento 
        */
        <>
            <section className="home-slider">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1>{props.greeting}</h1>

                        </div>
                    </div>
                </div>
            </section>
            <section className="home-featured">
                <h2 className="section-title">Destacados</h2>
                <div className="container">
                    <ItemList />   


                </div>
            </section>
            <section className="temporal">
                <h2 className="section-title">Espacio temporal</h2>
                <div className="container">

                    <div className="card product-card">
                        <div className="row">
                            <div className="col-6">
                                <img src="https://picsum.photos/600" alt="descripcion" className="img-fluid"/>
                            </div>
                            <div className="col-6">
                                <ItemCount stock={0} initial={0} onAdd={onAdd} />

                            </div>

                        </div>
                    </div>
                </div>


            </section>

        </>

    )
}
