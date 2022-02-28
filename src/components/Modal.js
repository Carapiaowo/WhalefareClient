import React from "react";
import { Col, Container, Form, Button, Card } from "react-bootstrap";
function Modal(props) {
  return (props.trigger)?(
    <>
    <div className="popup">
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
                
                                <Button className='btnnn' variant="secondary" size="lg" onClick={()=>props.setTrigger(false)}>
                                    Salir
                                </Button>
                                {props.children}
                    </Card.Body>
                     </Card>
                    </Col>
                </Container>
                </div>
    </>

  ):"";
}

export default Modal;