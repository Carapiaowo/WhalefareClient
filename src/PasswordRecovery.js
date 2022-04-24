import React, { useState, useContext } from 'react';
import { Alert } from 'reactstrap'
import { recoverVal, safetyPass } from './validation';
import ValidationModal from './ValidationModal';
import { Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import loginIcon from './images/login.png';
import { useHistory, withRouter, NavLink, useParams } from 'react-router-dom'
import Axios from 'axios';
import { AuthContext } from './Auth/AuthContext';
import generator from "generate-password";
function PasswordRecovery() {
    const user = useParams().string
    const [password, setPassword] = useState("");
    const [modalType, setType] = useState("");
    const [modalOpen, setOpen] = useState(false);
    const [recoverOpen, setRecover] = useState(true);
    const [mailSent, setMail] = useState("");

    const passwordRecover = () => {

        modalVal();
        let type = {
            modalValType: recoverVal(password)
        }
        setType(type)
        const validation = recoverVal(password);
        console.log(password)
        if (validation === true) {
            Axios.put("https://whalefare1.herokuapp.com/changepassword/" + user, { password: password }).then(response => {
                console.log(response.data)
                console.log(response.data.message)
                setMail(response.data.message);
            }).catch(error => {
                console.log(error.message);
            })
        } else {
            console.log("Contraseña débil" + validation)
            setType({ modalValType: recoverVal(password) });
        }
    }

    const generatePassword = () => {
        const pwd = generator.generate({
            length: 12,
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: true,
            strict: true
        });
        document.getElementById("Password").value = pwd;
    }

    const modalVal = () => {
        setOpen(!modalOpen)
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
                    {mailSent !== "" ?
                        <div>
                            {
                                mailSent ?
                                    <div>La contraseña se cambió correctamente, puedes volver a iniciar sesión con tu nueva contraseña.</div>
                                    :
                                    <div>Revisa que el enlace al que entraste sea correcto.</div>
                            }
                        </div>
                        :
                        <div>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <InputGroup>
                                        <Form.Control className='Password' id="Password" name="Password" placeholder="Escribe aquí." onChange={(event) => {
                                            setPassword(event.target.value);
                                            safetyPass(password)
                                        }} />
                                        <InputGroup.Text className="input-group-text" onClick={generatePassword}>
                                            <i className="fa fa-dice" aria-hidden="true" />
                                        </InputGroup.Text>

                                    </InputGroup>
                                    <div id="p1"></div>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button className='btnn' variant="primary" size="lg" onClick={passwordRecover}>
                                        Cambiar contraseña
                                    </Button>

                                </div>
                            </Form>
                        </div>

                    }
                </Col>
            </Container>
        </>
    )
}

export default withRouter(PasswordRecovery);