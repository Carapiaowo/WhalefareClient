import React, { useState, useContext } from 'react';
import iconLista from '../images/icono1.svg';
import iconUsuario from '../images/usuario.svg';
import iconLogout from '../images/logout.svg';
import iconNyT from '../images/nyt.png';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { Navbar, Container, NavItem } from 'react-bootstrap';
import {
    NavLink
} from 'react-router-dom'


function Navbarr() {
    let history = useHistory();
    const [nav, setnav] = useState(false);
    const { setIsLogged, isLogged } = useContext(AuthContext);
    const [modalLogout, setLogout] = useState(false)
    const changeBackground = () => {
        if (window.scrollY >= 20) {
            setnav(true);
        } else {
            setnav(false);
        }
    }

    const logOut = () => {
        const url = "https://whalefare.herokuapp.com/logout/" + isLogged.id
        Axios.post(url);
        setIsLogged({
            isAuth: false,
            id: null
        });
        history.push('/')
    }

    const setModalLogout = () => {
        setLogout(!modalLogout)
    }

    window.addEventListener('scroll', changeBackground);
    return (

        <nav bg="light" expand="lg" className={nav ? 'nav active' : 'nav'}>
            <Navbar>
                <Navbar.Brand className='whalefare' href="/" style={{ textDecoration: 'none', color: '	#4682B4' }}>WHALEFARE</Navbar.Brand>
                <div className='brand'>
                    <input type='checkbox' className='menu-btn' id='menu-btn' />
                    <label className='menu-icon' htmlFor='menu-btn'>
                        <span className='nav-icon'></span>
                    </label>
                    <ul className="menu">
                        <li className='iniini'><NavLink style={{ textDecoration: 'none', color: 'black' }} to="/login">Iniciar Sesión</NavLink></li>
                        <li className='active iniini'> <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/signup">Crear cuenta</NavLink></li>
                    </ul>
                </div>
            </Navbar>
            <Modal isOpen={modalLogout}>
                <ModalBody>
                    ¿Seguro que quieres cerrar tu sesión?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => { logOut(); setModalLogout() }}>Sí</button>
                    <button className="btn btn-secundary" onClick={() => { setModalLogout() }}>No</button>
                </ModalFooter>
            </Modal>
        </nav >
    )
}

export default Navbarr;
