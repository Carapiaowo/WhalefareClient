import React, { useContext } from 'react'
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import Navbar from './components/Navbarr';
import Login from './Login';
import Signup from './Signup';
import Feature from './components/Feature';
import Footer from './components/Footer';
import Politicas from './Politicas';
import Terminos from './Terminos';
import Notas from './Notas';
import Tarjetas from './Tarjetas';
import Homep from './HomeP';
import LoggedRoute from './LoggedRoute';
import NotLoggedRoute from './NotLoggedRoute';
import { Col, Container, Form, Button, Card } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,

} from 'react-router-dom'
import { AuthContext } from './Auth/AuthContext';
function RoutesManagement() {
    const { isLogged } = useContext(AuthContext);
    return (
        <Router>
            <Navbar />
            <div> <div id="main">
                <Switch>
                    <Route path="/" exact>
                        <div className='main'>
                            <div className='name'>
                                <h1>Almacena,genera y aplica contraseñas</h1>
                                <br />
                            
                                
                            <div className='btnnn' variant="secondary" size="lg" >
                            </div>
                            <Button className='btnnn' variant="secondary" size="lg" >
                                Comienza ya
                            </Button>
                            <Button className='btnnn2p' variant="secondary" size="lg" >
                                Descubre cómo
                            </Button>
                            </div>
                        </div>
                        <Feature></Feature>
                    </Route>
                    <Route path="/login">
                        <div className='main2'>
                            <NotLoggedRoute isAuth={isLogged.isAuth} Component={Login} />
                        </div>
                    </Route>
                    <Route path="/signup">
                        <div className='main3'>
                            <NotLoggedRoute isAuth={isLogged.isAuth} Component={Signup} />
                        </div>
                    </Route>
                    <Route path="/home">
                        <div className='main4'>
                            <div className="container">
                                <LoggedRoute isAuth={isLogged.isAuth} Component={Home} />
                            </div>
                        </div>
                    </Route>
                    <Route path="/profile">
                        <div className='main5'>
                            <LoggedRoute isAuth={isLogged.isAuth} Component={Profile} />
                        </div>
                    </Route>
        
                    <Route path="/terminos">
                        <div className='main4'>
                            <Terminos />
                        </div>
                    </Route>
                    <Route path="/politicas">
                        <div className='main4'>
                            <Politicas />
                        </div>
                    </Route>
                    <Route path="/notas">
                        <div className='main5'>
                            <Notas />
                        </div>
                    </Route>
                    <Route path="/tarjetas">
                        <div className='main5'>
                            <Tarjetas />
                        </div>
                    </Route>
                    <Route path="/homep">
                        <div className='main5'>
                            <Homep />
                        </div>
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </div>
                <Footer></Footer>
            </div>

        </Router >


    );
}

export default RoutesManagement;