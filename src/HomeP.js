import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Col, Container, Form, Button, Row, Card, CardGroup} from "react-bootstrap";
import Modal from "./components/Modal";
import Modal2 from "./components/Modal2";
import Navbarr from "./components/Navbarr.jsx";
function HomeP(){
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
    return(
    <>
    <Container>

    <div className="App">
                <br /><br /><br />
                <div className="container p-4">
                 <div className="col">

                <button className="btn-dark"disabled><i class="fa fa-plus "/><br/>Crear</button>
                <button className="btn-info" onClick={()=>setButtonPopup(true)}><i class="fa fa-pencil "/><br/>Nota</button>
                <Modal trigger={buttonPopup} setTrigger={setButtonPopup}></Modal>
                <button className="btn-info" onClick={()=>setButtonPopup2(true)}><i class="fa  fa-credit-card-alt  "/><br/> Tarjeta</button>
                <Modal2 trigger={buttonPopup2} setTrigger={setButtonPopup2}></Modal2>
                </div>    
            </div>
            <div>
                 <Card className="extra">
                 <div className="card-body">
                      <label>Titulo</label>
                         <div className="mb-3 input-group">
                           <input
                         name="Title"
                         id={"title"}
                         className="form-control"
                             />
                    </div>
             <label>Contenido</label>
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
</div>
                 <Card.Body>   
                 <div>
                  <button className="btn btn-primary"><i className="fa fa-pen" /></button>
                  <button className="btn btn-danger"><i className="fa fa-trash" /></button>
           </div>
                </Card.Body>
                <Card.Footer className="text-muted">Nota</Card.Footer>
                 </Card>


                 <Card className="extra">
                 <div className="card-body">
                      <label>Titulo</label>
                         <div className="mb-3 input-group">
                           <input
                         name="Title"
                         id={"title"}
                         className="form-control"
                             />
                    </div>
             <label>Número de tarjeta</label>
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
                </div>
            <Card.Body>   
                 <div>
                  <button className="btn btn-primary"><i className="fa fa-pen" /></button>
                  <button className="btn btn-danger"><i className="fa fa-trash" /></button>
           </div>
                </Card.Body>
                <Card.Footer className="text-muted">Tarjeta</Card.Footer>
                 </Card>
             
                 </div>



            </div>


        </Container>
    
    </>
    );
    }
    
    export default HomeP;