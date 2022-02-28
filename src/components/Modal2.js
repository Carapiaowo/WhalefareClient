import React from "react";
import { Col, Container, Form, Button, Card } from "react-bootstrap";
function Modal2(props2) {
  return (props2.trigger)?(
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
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control className='campo' name="name" type="text" placeholder="Escribe aquí." onChange={(event) => {
                               
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de tarjeta</Form.Label>
                            <Form.Control className='campo' name="title" type="text" placeholder="Escribe aquí." onChange={(event) => {
                               
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de vencimiento</Form.Label>
                            <Form.Control className='campo' name="date" type="date" placeholder="Escribe aquí." onChange={(event) => {
                               
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control className='campo' name="title" type="text" placeholder="Escribe aquí." onChange={(event) => {
                               
                            }} />
                        </Form.Group>
                    </Form>
                 <Button className='btnnn' variant="primary" size="lg" >
                                Insertar
                            </Button>
            
                            <Button className='btnnn' variant="secondary" size="lg" onClick={()=>props2.setTrigger(false)} >
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

export default Modal2;