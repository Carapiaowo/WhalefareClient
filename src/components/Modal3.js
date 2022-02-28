import { faHandMiddleFinger } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, Container, Form, Button, Card } from "react-bootstrap";
function Modal3(props3) {
  return (props3.trigger)?(
    <>
     <div className="popup">
<Container>
                <Col lg={4} md={6} sm={12} className='containerrr text-center'>      
                 <Card>
                 <div className="card-body">
                                                                        <label>Titulo</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="Title"
                                                                                id={"title"}
                                                                                className="form-control"
                                                                                
                                                                            />
                                                                        </div>
                                                                        <label>Nombre de usuario</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="User"
                                                                                id={"user"}
                                                                                className="form-control"
                                                                             
                                                                            />
                                                                        </div>
                                                                        <label>Contraseña</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="Password"
                                                                                type={'password'}
                                                                                id={"pass"}
                                                                                className="form-control"
                                                                    
                                                                            />
                                                                            <span
                                                                                className="input-group-text"
                                                                            >
                                                                                <i id={"eye"}
                                                                                    className="fa fa-eye"
                                                                                    aria-hidden="true"
                                                                                   
                                                                                >
                                                                                </i>
                                                                            </span>
                                                                        </div>
                                                                        <label>Sitio web</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="Website"
                                                                                id={"web"}
                                                                                className="form-control"
                                                                             
                                                                            />

                                                                        </div>
                                                                    
                                                                    </div>
                 <Card.Body>
                  
                      
                 <Button className='btnnn' variant="primary" size="lg" >
                                Insertar
                            </Button>
            
                            <Button className='btnnn' variant="secondary" size="lg" onClick={()=>props3.setTrigger(false)} >
                                Salir
                            </Button>
                </Card.Body>
                 </Card>
                </Col>
            </Container>
            </div>
</>
  ):"";
}

export default Modal3;