import React, { useContext } from 'react'
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import Navbar from './components/Navbarr';
import Sidebar from './components/Sidebar';
import Login from './Login';
import Signup from './Signup';
import Feature from './components/Feature';
import Footer from './components/Footer';
import Politicas from './Politicas';
import Terminos from './Terminos';
import Homen from './Homen';
import Homet from './Homet';
import { animateScroll as scroll } from "react-scroll";
import LoggedRoute from './LoggedRoute';
import NotLoggedRoute from './NotLoggedRoute';
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Col, Container, Form, Button, Card } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useLocation,

} from 'react-router-dom'
import { AuthContext } from './Auth/AuthContext';


function RoutesManagement() {
    const scrollToBottom = () => {
        scroll.scrollTo(800)
    }
    const { isLogged } = useContext(AuthContext);
    return (
        <Router>
            <div> <div id="main">
                <Sidebar />
               
                    <Switch>
                        <Route path="/" exact>
                            <Navbar />
                            <div className='main'>
                            <div className='name'>
                                    <h1>Gestiona,</h1>
                                    <h1><span>sincroniza</span></h1>
                                    <h1>y protege</h1>
                                    <h1>tus datos</h1>
                                    <br />
                                   <div className='btnini'> 
                                    <NavLink style={{ textDecoration: 'none', color:'white'}} to="/signup"> 
                                    <Button className='btnnini' variant="secondary" size="lg" >Comienza ya</Button></NavLink>                    
                                    <Button className='btnnn2' variant="light" size="lg" onClick={scrollToBottom} >
                                    Descubre
                                    </Button>
                                    </div>
                                </div>
                            </div>
                            <Feature></Feature>
                            <Footer></Footer>
                        </Route>
                        <Route path="/login">
                            <Navbar />
                            <div className='main2'>
                                <NotLoggedRoute isAuth={isLogged.isAuth} Component={Login} />
                            </div>
                            <Footer></Footer>
                        </Route>
                        <Route path="/signup">
                            <Navbar />
                            <div className='main3'>
                                <NotLoggedRoute isAuth={isLogged.isAuth} Component={Signup} />
                            </div>
                            <Footer></Footer>
                        </Route>

                        <Route path="/home">
                            <div className="container">
                                <Home />
                            </div>
                        </Route>
                        <Route path="/homen" component={Homen}>       
                        </Route>
                        <Route path="/homet" component={Homet}>
                        </Route>
                        <Route path="/profile" component={Profile}>
                        </Route>
                        <Route path="/terminos">
                            <Navbar />
                            <div className='main4'>
                                <Terminos />
                                <Footer></Footer>
                            </div>
                        </Route>

                        <Route path="/politicas">
                            <Navbar />
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
