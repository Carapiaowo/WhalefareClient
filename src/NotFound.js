import React from "react";
import {Link} from 'react-router-dom'

function NotFound() {
    return(
        <div className='text-center md-3 p-5'>
            La página que intentas buscar no existe
            <br/>
            <Link to='/'>Regresar a la página principal</Link>
        </div>
      
    )
}

export default NotFound;