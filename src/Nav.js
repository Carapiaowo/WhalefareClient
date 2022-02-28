import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import {
    NavLink,
    
} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
function Nav() {
    const [isLogged, setIsLogged] = useState();

    const check = () => {
        Axios.get('https://whalefare1.herokuapp.com/profile').then((response) => {
            if (response.data.loggedIn) {
                setIsLogged(response.data.loggedIn)
            } else {
                setIsLogged(false)
            }
        });
    }

    const logOut = () => {
        Axios.post("https://whalefare1.herokuapp.com/logout");
        
    }

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            check();
            mounted.current = true;
        } else {
            check();
        }
    });
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid ">
                    <div className="navbar-brand mx-5">WHALEFARE</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-5">
                            {isLogged === false ?
                                <div> </div>
                                :
                                <li className="nav-item">
                                    <div className="nav-link" aria-current="page"><NavLink to="/home" activeClassName="active">Home</NavLink></div>
                                </li>
                            }
                            {isLogged === true ?
                                <div> </div>
                                :
                                <div>
                                    <li className="nav-item">
                                        <div className="nav-link" aria-current="page"><NavLink to="/sign" activeClassName="active">Iniciar sesión</NavLink></div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link" aria-current="page"><NavLink to="/sign" activeClassName="active">Registrarme</NavLink></div>
                                    </li>
                                </div>
                            }
                            {isLogged === false ?
                                <div> </div>
                                :
                                <div>
                                    <li className="nav-item">
                                        <div className="nav-link" aria-current="page"><NavLink to="/sign" onClick={logOut} activeClassName="active">Cerrar sesión</NavLink></div>
                                    </li>

                                    <li className="nav-item">
                                        <div className="nav-link" aria-current="page"><NavLink to="/profile" activeClassName="active">Profile</NavLink></div>
                                    </li>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Nav)