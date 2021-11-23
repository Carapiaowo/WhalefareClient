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
import Generador from './Generador';
import LoggedRoute from './LoggedRoute';
import NotLoggedRoute from './NotLoggedRoute';
//import { AuthProvider } from "./Auth/AuthContext";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,

} from 'react-router-dom'
import { AuthContext } from './Auth/AuthContext';
function RoutesManagement() {
    const { isLogged } = useContext(AuthContext);
    console.log(isLogged)

    return (
        <Router>
            <Navbar />
            <div> <div id="main">
                <Switch>
                    <Route path="/" exact>
                        <div className='main'>
                            <div className='name'>
                                <h1><span>Almacena</span>, genera y aplica contraseñas</h1>
                                <br />
                                <p className='details'>Whalefare te ofrece un entorno seguro para almacenar, generar y aplicar contraseñas.</p>
                                <Link to="/login" className='cv-btn'>Comienza ya</Link>
                            </div>
                        </div>
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
                    <Route path="/generar">
                        <div className='main'>
                            <Generador />
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
                    <Route component={NotFound} />
                </Switch>
            </div>
                <Feature></Feature>
                <Footer></Footer>
            </div>

        </Router >


    );
}

export default RoutesManagement;