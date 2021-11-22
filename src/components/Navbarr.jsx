import React, { useState, useContext } from 'react';
import iconLista from '../images/lista.png';
import iconUsuario from '../images/usuario.png';
import iconLogout from '../images/logout.png';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Axios from 'axios';
import { Navbar, Container, NavItem } from 'react-bootstrap';
import {
    NavLink
} from 'react-router-dom'


function Navbarr() {
    let history = useHistory();
    const [nav, setnav] = useState(false);
    const { setIsLogged, isLogged } = useContext(AuthContext);
    const changeBackground = () => {
        if (window.scrollY >= 20) {
            setnav(true);
        } else {
            setnav(false);
        }
    }

    const logOut = () => {
        Axios.post("https://whalefare.herokuapp.com/logout");
        setIsLogged({
            isAuth: false,
            id: null
        });
        history.push('/')
    }

    window.addEventListener('scroll', changeBackground);
    return (

        <nav bg="light" expand="lg" className={nav ? 'nav active' : 'nav'}>
            <Navbar>

                <Container>
                    <h1 className='title'> <Navbar.Brand href="/" style={{ textDecoration: 'none', color: '	#4682B4' }}>WHALEFARE</Navbar.Brand></h1>
                    <input type='checkbox' className='menu-btn' id='menu-btn' />
                    <label className='menu-icon' htmlFor='menu-btn'>
                        <span className='nav-icon'></span>
                    </label>
                    {isLogged.isAuth !== true ?
                        <ul className='menu'>
                            <li className='active'><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">Iniciar Sesión</NavLink></li>
                            <li> <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/signup">Registrar</NavLink></li>

                        </ul>
                        :
                        <ul className="menu">
                            <NavItem><NavLink to="/home"><img className='logoo' alt="Imagen de algo" src={iconLista}></img></NavLink></NavItem>
                            <NavItem><NavLink to="/profile"><img className='logoo' alt="Otra imagen de algo" src={iconUsuario}></img></NavLink></NavItem>
                            <NavItem><img className='logoo' alt="Tercera imagen de algo" src={iconLogout} onClick={() => { logOut(); }}></img></NavItem>
                        </ul>
                    }
                </Container>

            </Navbar>
        </nav>

    )
}

export default Navbarr;