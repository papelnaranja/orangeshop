
import {ItemCount} from '../itemCount/itemCount.js'
import {ItemList} from '../itemList/itemList.js'

export function ItemListContainer(props) {
    //Acá va ir la Logica de los productos ? 
    return (

        /*Esto se tiene que cambiar a un layout en algún momento */
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
                <div className="card product-card">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://picsum.photos/800" alt="" className="img-fluid"/>
                        </div>
                        <div className="col-6">
                            <ItemCount stock={5} initial={1} />

                        </div>

                    </div>
                </div>

            </section>

        </>

    )
}
