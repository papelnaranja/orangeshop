import {Link} from "react-router-dom";

export const NoMatch = ({mensaje}) => {
    return(
        <main>
            <div className="container">
                <h1>Oh no!</h1>
                <div className="card product-card">
                    <div className="card-body">
                    <p className="strong">{mensaje}</p>
                    <Link to="/">Regresa al Inicio</Link>

                    </div>
                </div>
            </div>
        </main>
    
    ) 
}