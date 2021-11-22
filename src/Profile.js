import React, { useEffect, useState, useRef, /* useContext */ } from 'react';
import { hashString } from 'react-hash-string'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Col, Container, Form, Button, Card } from "react-bootstrap";
//import { AuthContext } from './Auth/AuthContext';

function Profile() {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [clicked, setClicked] = useState(true);

    //const { isLogged } = useContext(AuthContext)

    const toEditUser = () => {
        if (clicked) {
            document.getElementById("btn0" + id).hidden = true;
            document.getElementById("btn1" + id).hidden = false;
            document.getElementById("user" + id).disabled = false;
            document.getElementById("email" + id).disabled = false;

            setClicked(false);
        }
    }

    const editUser = (id_u) => {
        if (!clicked) {
            document.getElementById("btn0" + id).hidden = false;
            document.getElementById("btn1" + id).hidden = true;
            document.getElementById("user" + id).disabled = true;
            document.getElementById("email" + id).disabled = true;

            setClicked(true);
            /*
            Axios.post("http://localhost:4000/edit/" + id_u, {
                title_c: Title,
                user_c: User,
                pass_c: Password,
                website_c: Website
            });
            */
        }
    }

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            Axios.get('https://whalefare.herokuapp.com/profile').then((response) => {
                if (response.data.user) {
                    setUser(response.data.user[0].user_u);
                    setId(hashString(response.data.user[0].email_u));
                    setEmail(response.data.user[0].email_u);
                }
            });
            mounted.current = true;
        }
    })

    return (


        <>
            <Container>
                <Col lg={4} md={6} sm={12} className="text-center containerrr">

                    <Card.Header>Tu perfil</Card.Header>

                    <img className="icon-img2" src={"https://www.gravatar.com/avatar/783" + id + "?d=identicon&s=1024&r=PG"} alt="icon" />
                    {
                        //
                        //https://avatars.dicebear.com/api/jdenticon/" + id + ".svg?b=%23000000&r=50
                    }
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control className='campo' type="text" disabled={true} defaultValue={user} id={"user" + id}
                                onChange={(event) => {
                                    setUser(event.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control className='campo' type="email" disabled={true} defaultValue={email} id={"email" + id}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" className="btnn" id={"btn0" + id} hidden={false} onClick={() => { toEditUser(id) }}>Editar</Button>
                            <Button variant="primary" size="lg" className="btnn" id={"btn1" + id} hidden={true} onClick={() => { editUser(id) }}>Guardar</Button>

                        </div>

                    </Form>
                </Col>
            </Container>
        </>
    )
}

export default withRouter(Profile);