import React, { useState, useContext } from 'react';
import { Alert } from 'reactstrap'
import { loginVal, } from './validation';
import ValidationModal from './ValidationModal';
import { Col, Container, Form, Button } from "react-bootstrap";
import loginIcon from './images/login.png';
import { useHistory, withRouter } from 'react-router-dom'
import Axios from 'axios';
import { AuthContext } from './Auth/AuthContext';
function Login() {
    const { setIsLogged } = useContext(AuthContext);

    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [modalType, setType] = useState("");
    const [modalOpen, setOpen] = useState(false);
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
            console.log("Login al menos con click")
            Axios.post("https://whalefare.herokuapp.com/login", {
                password: Password,
                email: Email
            }).then((response) => {
                console.log("Post hecho?")
                const data = response.data
                console.log(data)
                if (data.isLogged === true) {
                    console.log("If login", data)
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
            console.log(modalType.modalValType)
            onShowAlert();
        }

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
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
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
                                {
                                    //Mensaje de error cuando las credenciales no coinciden
                                }
                            </div>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button className='btnn' variant="primary" size="lg" onClick={logUser}>
                                Inicia Sesión
                            </Button>
                            <div>
                                <p>¿No tienes una cuenta?</p>
                                <a href="/signup"><small className='reset'>Crea una</small></a>
                            </div>

                        </div>
                    </Form>

                </Col>
            </Container>
        </>
        /*<div>
            {
                <div className="containerr2">
                    <Alert color="info"
                        isOpen={modalOpen}
                    >
                        <ValidationModal {...modalType} />
                    </Alert>
                    <h1>Iniciar sesión</h1>
                    <div className="container">
                        <label>Correo electrónico</label>
                        <div className="input-container">
                            <input type="email" className="text_area" placeholder="Escribe aquí." name="email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }} />
                        </div>
                        <label>Contraseña</label>
                        <div className="input-container">
                            <input type="password" id="Password" className="text_area" placeholder="Escribe aquí." name="password"
                                onChange={(event) => {
                                    setPassword(event.target.value);

                                }} />
                            <div id="p1">
                                {
                                    //Mensaje de error cuando las credenciales no coinciden
                                }
                            </div>
                        </div>
                        <div className="btn btn-primary" onClick={logUser}>Iniciar sesión</div>

                        <p>¿No tienes una cuenta?</p>
                        <p><a className="link" href="/signup">Crea una</a></p>
                        <div className="container"></div>
                    </div>
                </div>
                
         
        </div>
           }*/

    )
}

export default withRouter(Login);