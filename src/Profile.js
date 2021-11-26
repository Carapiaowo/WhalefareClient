import React, { useEffect, useState, useContext } from 'react';
import { hashString } from 'react-hash-string';
import { withRouter } from 'react-router-dom';
import { Col, Container, Form, Button, Card } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader, Alert } from "reactstrap";
import { updateVal } from './validation';
import ValidationModal from './ValidationModal';
import { AuthContext } from './Auth/AuthContext';
import Axios from 'axios';

function Profile() {

    const { isLogged } = useContext(AuthContext);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [profilePic, setPic] = useState("");
    const [id, setId] = useState();
    const [clicked, setClicked] = useState(true);
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [modalOpen, setOpen] = useState(false);
    const [modalType, setType] = useState("");

    const openEditor = () => {
        if (clicked) {
            document.getElementById("btn0" + id).hidden = true;
            document.getElementById("btn1" + id).hidden = false;
            document.getElementById("user").disabled = false;
            document.getElementById("email").disabled = false;

            setClicked(false);
        }
    }

    const closeEditor = () => {
        if (!clicked) {
            document.getElementById("btn0" + id).hidden = false;
            document.getElementById("btn1" + id).hidden = true;
            document.getElementById("user").disabled = true;
            document.getElementById("email").disabled = true;
            setClicked(true);
            modalUpdate();
        }
    }

    const modalUpdate = () => {
        setModal(!modal)
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

    const editUser = () => {
        const form = {
            user,
            email,
            password
        }
        const validation = updateVal(form);
        if (validation === true) {
            Axios.put("https://whalefare.herokuapp.com/profileedit/" + id, {
                user,
                email,
                password
            }).then((response) => {
                console.log(response.data)
                let type = {
                    modalValType: response.data.message
                }
                setType(type)
                onShowAlert();
            });
            modalUpdate();
        } else {
            let type = {
                modalValType: validation
            }
            setType(type)
            onShowAlert();
        }
    }

    useEffect(() => {
        setId(isLogged.id);
        Axios.get("https://whalefare.herokuapp.com/profile/" + isLogged.id).then((response) => {
            setEmail(response.data.user.email)
            setUser(response.data.user.user)
            setPic(hashString(response.data.user.email))
        })
    }, [])

    return (
        <>
            <Container>
                <Col lg={4} md={6} sm={12} className="text-center containerrr">

                    <Card.Header>Tu perfil</Card.Header>

                    <img className="icon-img2" src={"https://www.gravatar.com/avatar/783" + profilePic + "?d=identicon&s=1024&r=PG"} alt="icon" />
                    <Form>
                        <Form.Group>
                            <div className='containerr2'>
                                <Alert color="info"
                                    isOpen={modalOpen}
                                >
                                    <ValidationModal {...modalType} />
                                </Alert>
                            </div>
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control className='campo' type="text" disabled={true} defaultValue={user} id={"user"}
                                onChange={(event) => {
                                    setUser(event.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control className='campo' type="email" disabled={true} defaultValue={email} id={"email"}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" className="btnn" id={"btn0" + id} hidden={false} onClick={() => { openEditor(id) }}>Editar</Button>
                            <Button variant="primary" size="lg" className="btnn" id={"btn1" + id} hidden={true} onClick={() => { closeEditor(id) }}>Guardar</Button>
                        </div>

                    </Form>
                </Col>
            </Container>
            <Modal isOpen={modal}>
                <ModalHeader style={{ display: 'block' }}>
                    <span style={{ float: 'right' }} onClick={() => modalUpdate()}>x</span>
                </ModalHeader>
                <ModalBody>
                    <div className='containerr2'>
                        <Alert color="info"
                            isOpen={modalOpen}
                        >
                            <ValidationModal {...modalType} />
                        </Alert>
                    </div>
                    <div>
                        <p>Por favor ingresa tu contraseña para confirmar los cambios</p> <br />
                        <Form.Control className='campo' type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => editUser()}>Guardar cambios</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default withRouter(Profile);