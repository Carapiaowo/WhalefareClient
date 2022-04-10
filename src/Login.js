import React, { useState, useContext } from 'react';
import { Alert } from 'reactstrap'
import { loginVal, } from './validation';
import ValidationModal from './ValidationModal';
import { Col, Container, Form, Button } from "react-bootstrap";
import loginIcon from './images/login.png';
import { useHistory, withRouter, NavLink } from 'react-router-dom'
import Axios from 'axios';
import { AuthContext } from './Auth/AuthContext';
function Login() {

    const { setIsLogged } = useContext(AuthContext);
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [modalType, setType] = useState("");
    const [modalOpen, setOpen] = useState(false);
    const [recoverOpen, setRecover] = useState(false);

    let history = useHistory();

    const logUser = () => {
        const user = {
            Password: Password,
            Email: Email,
        }

        modalVal();
        let type = {
            modalValType: loginVal(user)
        }
        setType(type)
        if (type.modalValType === true) {
            Axios.post("https://whalefare1.herokuapp.com/login", {
                password: Password,
                email: Email
            }).then((response) => {
                const data = response.data
                if (data.isLogged === true) {
                    modalVal();
                    setType({ modalValType: data.isLogged });
                    setIsLogged({
                        isAuth: data.isLogged,
                        id: data.id
                    });
                    onShowAlert();
                    history.push('/home')
                    return;
                } else {
                    setIsLogged({
                        isAuth: false,
                        id: null
                    });
                    setType({ modalValType: 'wrong' });
                    onShowAlert();
                }
            });
        } else {
            setIsLogged({
                isAuth: false,
                id: null
            });
            setType({ modalValType: 'unverified' });
            onShowAlert();
        }

    }

    function recover(){
        setRecover(!recoverOpen)
    }

    const modalVal = () => {
        setOpen(!modalOpen)
    }

    const onShowAlert = () => {
        setOpen(true)
        const open = () => {
            window.setTimeout(() => {
                setOpen(false)
            }, 1000)
        };
        open();
    }
    return (
        <>
            <Container>
                <Col lg={4} md={6} sm={12} className='containerrr text-center'>
                    <div className="containerr2">
                        <Alert color="info"
                            isOpen={modalOpen}
                        >
                            <ValidationModal {...modalType} />
                        </Alert>
                    </div>
                    <img className="icon-img" src={loginIcon} alt="icon" />
                    <Form>
                    {recoverOpen?
                            //formulario de recuperación
                            <>
                            <Form.Group className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control className='campo' name="email" type="email" placeholder="Escribe aquí." onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                            </Form.Group>

                            <div className="d-grid gap-2">
                            <Button className='btnn' variant="primary" size="lg" onClick={logUser}>
                                Recuperar cuenta
                            </Button>
                            <i className='recuperacion' onClick={recover}>Volver</i>
                           </div>
                            </>
                
                            :
                            //formulario de inicio 
                            <>
                            <Form.Group className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control className='campo' name="email" type="email" placeholder="Escribe aquí." onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control className='campo' id="Password" type="password" placeholder="Escribe aquí." onChange={(event) => {
                                    setPassword(event.target.value);
                                }} />
                                <div id="p1">

                                </div>
                            </Form.Group>
                            <div className="d-grid gap-2">
                            <Button className='btnn' variant="primary" size="lg" onClick={logUser}>
                                Iniciar sesión
                            </Button>
                            <div>
                                <br></br>
                                ¿No tienes una cuenta?
                                <br></br>
                                <NavLink to="/signup">
                                    Crea una
                                </NavLink>
                                <br></br>
                                <br></br>
                            </div>
                            <i className='recuperacion' onClick={recover}>¿Olvidaste tu contraseña?</i>
                            
                        </div>
                        </>
                            }
                        
                    </Form>

                </Col>
            </Container>
        </>
    )
}

export default withRouter(Login);