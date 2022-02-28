import React from "react";
import {Link} from 'react-router-dom'
import { Container, Card, Form, Button } from "react-bootstrap";
function NotFound() {
    return(

        
      <div className="main">
         <Container>
                <Card lg={4} md={6} sm={12} className="right">
                    <Card.Header>La página que intentas buscar no existe</Card.Header>
                    <Form>
                    <Link to='/'>Regresar a la página principal</Link>
                    </Form>
                </Card>
            </Container>
    
        </div>
      
    )
}

export default NotFound;