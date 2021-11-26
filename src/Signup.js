import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { signupVal, safetyPass } from './validation'
import { Alert, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import ValidationModal from './ValidationModal';
import { Col, Container, Form, Button } from "react-bootstrap";
import loginIcon from './images/login.png';
import Axios from 'axios';

function Signup() {

    const [Password, setPassword] = useState("");
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [modalType, setType] = useState("")
    const [modalOpen, setOpen] = useState(false);
    const [popOver, setPopOver] = useState(false)
    const addUser = () => {
        const newUser = {
            Password: Password,
            User: User,
            Email: Email
        }
        modalVal();
        let type = {
            modalValType: signupVal(newUser)
        }
        setType(type)
        if (type.modalValType === true) {
            Axios.post("https://whalefare.herokuapp.com/signup", {
                username: User,
                password: Password,
                email: Email
            }).then((response) => {

            });
        } else {
            onShowAlert()
        }
    }

    const onShowAlert = () => {
        setOpen(true)
        const open = () => {
            window.setTimeout(() => {
                setOpen(false)
            }, 2000)
        };
        open();
    }

    const modalVal = () => {
        setOpen(!modalOpen)
    }

    return (

        <>
            <Container>
                <Col lg={4} md={6} sm={12} className="containersign text-center">
                    <div className='containerr2'>
                        <Alert color="info"
                            isOpen={modalOpen}
                        >
                            {
                                modalType.modalValType === true ?
                                    <div>Inicia sesión para verificar tu cuenta</div> :
                                    <br />
                            }
                            <ValidationModal {...modalType} />
                        </Alert>
                    </div>
                    <img className="icon-img" src={loginIcon} alt="icon" />

                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control className='campo' name="username" type="text" placeholder="Escribe aquí." onChange={(event) => {
                                setUser(event.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control className='campo' type="email" placeholder="Escribe aquí." onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Contraseña   </Form.Label><i className="fa fa-info-circle" type="button" id="Popover1"></i>
                            <div>
                                <Popover
                                    flip
                                    isOpen={popOver}
                                    target="Popover1"
                                    toggle={() => { setPopOver(!popOver) }}
                                >
                                    <PopoverHeader>
                                        Sugerencias
                                    </PopoverHeader>
                                    <PopoverBody>
                                        Te recomendamos usar contraseñas que contengan mayúsculas y minúsculas, signos de puntuación (<i>@</i>, <i>$</i>, <i>!</i>, <i>%</i>, <i>*</i>, <i>#</i>, <i>?</i>, <i>.</i>, <i>:</i>, <i>;</i>) y números.
                                    </PopoverBody>
                                </Popover>
                            </div>
                            <Form.Control className='campo' id="Password" type="password" placeholder="Escribe aquí." onChange={(event) => {
                                setPassword(event.target.value);
                                safetyPass(event.target.value);
                            }} />
                            <div id="p1"></div>
                        </Form.Group>
                        <p>
                            Al hacer clic en <i>Crear cuenta</i>, <br />aceptas nuestras
                            <NavLink to="/terminos" style={{ color: 'blue' }}> condiciones </NavLink>
                            y la <NavLink to="/politicas" style={{ color: 'blue' }}>política de privacidad</NavLink>.
                        </p>
                        <div className="d-grid gap-2">
                            <Button className='btnn' variant="primary" size="lg" onClick={addUser}>
                                Crear cuenta
                            </Button>
                            <div>
                                <p>¿Ya tienes una cuenta?</p>
                                <NavLink to="/login">
                                    Inicia sesión
                                </NavLink>
                            </div>

                        </div>
                    </Form>
                </Col>
            </Container>
        </>
        /*
        <div className="containerr2">
            <Alert color="info"
                isOpen={modalOpen}
            >
                <ValidationModal {...modalType} />
            </Alert>
            <h1>Registrarme</h1>
            <div className="container">
                <label>Nombre de usuario</label>
                <div className="input-container">
                    <input type="text" className="text_area" placeholder="Escribe aquí." name="username"
                        onChange={(event) => {
                            setUser(event.target.value);
                        }} />
                </div>
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
                            safetyPass(event.target.value);
                        }} />
                    <div id="p1"></div>
                </div>
                <button className="btn btn-primary" onClick={addUser}>Crear cuenta</button>
                <p>¿Ya tienes una cuenta?</p>
                <p><a className="link" href="/login">Inicia sesión</a></p>
                <div className="container"></div>
            </div>

        </div>
*/
    )
}

export default withRouter(Signup);