import {Link} from "react-router-dom";
export const NoMatch = () => {
    return(
    <main>
        <div className="container">
            <h1>Nada por aquí </h1>
            <Link to="/">Regresa al Inicio</Link>

        </div>
    </main>) 
}