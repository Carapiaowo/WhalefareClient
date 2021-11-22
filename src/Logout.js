import React from 'react';
import Axios from 'axios';

function Logout(){
    Axios.post("https://whalefare.herokuapp.com/logout");
    return(
        <div className='text-center md-3 p-5'>
            Gracias por visitarnos. Vuelve pronto.
        </div>
    );
    
}

export default Logout;