import React from 'react';
import { NavLink } from 'react-router-dom';
import { Alert } from 'reactstrap'
import { loginVal, } from './validation';
import ValidationModal from './ValidationModal';
import { Col, Container, Form, Button, Card } from "react-bootstrap";
import loginIcon from './images/login.png';
import { useHistory, withRouter} from 'react-router-dom'
import Axios from 'axios';
import { AuthContext } from './Auth/AuthContext';
function Notas(){
return(
<>
<Container>
                <Col lg={4} md={6} sm={12} className='containerrr text-center'>      
                 <Card>
                 <Card.Body>
                     
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control className='campo' name="title" type="text" placeholder="Escribe aquí." onChange={(event) => {
                               
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control className='camponota' id="Content" type="text" placeholder="Escribe aquí." onChange={(event) => {
                              
                            }} />
                            <div id="p1">

                            </div>
                        </Form.Group>
                    </Form>
                 <Button className='btnnn' variant="primary" size="lg" >
                                Insertar
                            </Button>
            
                            <Button className='btnnn' variant="secondary" size="lg" >
                                Salir
                            </Button>
                </Card.Body>
                 </Card>
                </Col>
            </Container>
</>
);
}

export default Notas;