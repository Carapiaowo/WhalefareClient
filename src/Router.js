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
import Homen from './Homen';
import Homet from './Homet'
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
                        <Footer></Footer>
                    </Route>
                    <Route path="/login">
                        <div className='main2'>
                            <NotLoggedRoute isAuth={isLogged.isAuth} Component={Login} />
                        </div>
                        <Footer></Footer>
                    </Route>
                    <Route path="/signup">
                        <div className='main3'>
                            <NotLoggedRoute isAuth={isLogged.isAuth} Component={Signup} />
                        </div>
                        <Footer></Footer>
                    </Route>
                    <Route path="/home">
                        <div className='main4'>
                            <div className="container">
                                <Home/>
                            </div>
                        </div>
                    </Route>
                    <Route path="/homen">
                        <div className='main5'>
                        <Homen/>
                        </div>                   
                    </Route>
                    <Route path="/homet">
                        <div className='main5'>
                        <Homet/>
                        </div>                   
                    </Route>
                    <Route path="/profile">
                        <div className='main5'>
                            <LoggedRoute isAuth={isLogged.isAuth} Component={Profile} />
                        </div>
                        <Footer></Footer>
                    </Route>
                    <Route path="/terminos">
                        <div className='main4'>
                            <Terminos />
                            <Footer></Footer>
                        </div>
                    </Route>
                    <Route path="/politicas">
                        <div className='main4'>
                            <Politicas />
                            <Footer></Footer>
                        </div>
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </div>
              
            </div>

        </Router >


    );
}

export default RoutesManagement;