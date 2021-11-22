import { useState } from 'react';
import Axios from 'axios';
import icon from './images/padlock.png';
import { Col, Container, Form, Button, Card } from "react-bootstrap";
import Generador from './Generador';

const { safetyPass } = require('./validation');

function Add() {

  const [Password, setPassword] = useState("");
  const [User, setUser] = useState("");
  const [Website, setWebsite] = useState("");
  const [Title, setTitle] = useState("");

  /*
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Las contraseñas no coinciden', 'danger', 2000);
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  */

  const addPassword = () => {
    Axios.post("https://whalefare.herokuapp.com/add", {
      title_c: Title,
      user_c: User,
      pass_c: Password,
      website_c: Website,
      id_u: 18
    });
    emptyInputs();
  }

  const emptyInputs = () => {
    Array.from(document.querySelectorAll("input[name='form']")).forEach(
      input => (input.value = "")
    );
  }

  return (
    <>
      <Container>
        <Card lg={4} md={6} sm={12} className="containeradd">
          <br />
          <Card.Header style={{ width: '100%' }}>Añade una contraseña</Card.Header>
          <img className="icon-imgg" src={icon} alt="icon" />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label>Título</Form.Label>
              <Form.Control className='campo' type="text" name="form"
                id={"Title"}
                placeholder="Contraseña de Facebook"
                onChange={(event) => { setTitle(event.target.value); }}
              />
              <Form.Label>Usuario</Form.Label>
              <Form.Control className='campo' type="text" id="user" placeholder="Opcional"
                onChange={(event) => {
                  setUser(event.target.value);
                }} />
              <Form.Label>Sitio web</Form.Label>
              <Form.Control className='campo' type="website" id="email" placeholder="Escribe aquí."
                onChange={(event) => {
                  setWebsite(event.target.value);
                }} />
            </Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control className='campo' type="text" name="form"
              id={"Password"} placeholder="Escribe aquí."
              onChange={(event) => {
                setPassword(event.target.value)
                safetyPass(event.target.value)
                  ;
              }} />
            <p className="valid-feedback" id="p1"></p>
            <p className="invalid-feedback" id="p1">Tu contraseña es débil.</p>
            <br />
            <div className="d-grid gap-2">
              <Button className='btnn' variant="primary" size="lg" onClick={addPassword}>Añadir</Button>

            </div>
          </Form>
        </Card>
        <Col lg={4} md={6} sm={12} className='right'>
          <Generador />
        </Col>
      </Container>
    </>

  );
}

export default Add;
