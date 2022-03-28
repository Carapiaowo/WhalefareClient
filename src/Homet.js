import React, { Component } from 'react';
import generator from "generate-password";
import { withRouter } from 'react-router-dom';
import { Col, Form, Button, Card, FormControl } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, ModalBody, ModalFooter, ModalHeader, Alert, List, Progress, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { formVal, safetyPass } from './validation';
import ValidationModal from './ValidationModal';
import { AuthContext } from './Auth/AuthContext'
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import Switch from '@material/react-switch';
import "@material/react-switch/dist/switch.css";
import Axios from 'axios';

class Homet extends Component {
    static contextType = AuthContext;
    state = {
        checked: false,
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        data: [],
        authorized: false,
        modalInsertar: false,
        modalEliminar: false,
        popOver: false,
        modalVal: {
            modalValOpen: false,
            modalValType: '',
        },
        tipoModal: '',
        idUser: this.context.isLogged.id,
        form: {
            id_c: '',
            id_u: '',
            Title: '',
            Password: '',
            User: '',
            Website: '',
            safetyMeter: false
        }
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
        this.peticionRead();
    }

    modalVal = () => {
        this.setState({
            modalVal:
            {
                ...this.state.modalVal,
                modalValOpen: !this.state.modalVal.modalValOpen
            }
        });
    }

    onShowAlert = () => {
        this.setState({ modalVal: { modalValOpen: true } }, () => {
            window.setTimeout(() => {
                this.setState({ modalVal: { modalValOpen: false } })
            }, 1000)
        });
    }

    peticionRead = () => {
        if (this.state.idUser) {
            this.setState({ data: [] })
            Axios.post("https://whalefare1.herokuapp.com/read", { id_u: this.state.idUser }).then(response => {
                this.setState({ data: response.data.result, authorized: response.data.authorized[0].authorized_u });
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    peticionPost = async () => {
        const { form } = this.state;
        let validation = formVal(form)
        if (validation === true) {
            if (this.state.idUser !== null) {
                delete form.id_c;
                await Axios.post("https://whalefare1.herokuapp.com/add", {
                    title_c: form.Title,
                    user_c: form.User,
                    pass_c: form.Password,
                    website_c: form.Website,
                    safe_c: safetyPass(form.Password),
                    id_u: this.state.idUser
                }).then(response => {
                    this.modalInsertar();
                }).catch(error => {
                    console.log(error.message);
                })
            }
        } else {
            this.onShowAlert()
            this.setState({
                modalVal: {
                    ...this.modalVal,
                    modalValType: validation,
                    modalValOpen: true
                }
            }, () => {
            })

        }
    }

    peticionPut = async () => {
        let url = ("https://whalefare1.herokuapp.com/edit/" + this.state.form.id_c)
        const { form } = this.state;
        let validation = formVal(form)
        if (validation === true) {
            this.modalInsertar();
            await Axios.put(url, {
                title_c: form.Title,
                user_c: form.User,
                pass_c: form.Password,
                website_c: form.Website,
                safety_c: safetyPass(form.Password),
            }).then(response => {
                this.modalInsertar();
            }).catch(error => {
                console.log(error.message);
            })
        } else {
            this.onShowAlert()
            this.setState({
                modalVal: {
                    modalValType: validation,
                    modalValOpen: true
                }
            }, () => {
            })
        }
    }

    peticionDelete = () => {
        const url = "https://whalefare1.herokuapp.com/delete/" + this.state.form.id_c
        Axios.delete(url).then(response => {

        })
        this.setState({ modalEliminar: false });
        this.peticionRead();
    }

    decryptedPassword = (encryption) => {
        Axios.post('https://whalefare1.herokuapp.com/decryptpass',
            {
                password: encryption.pass_c,
                iv: encryption.key_c
            })
            .then((response) => {
                this.setState({
                    form: {
                        ...this.state.form,
                        Password: response.data
                    }
                })

            });
    };

    seleccionarEmpresa = (pass) => {
        this.decryptedPassword(pass);
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_c: pass.id_c,
                Title: pass.title_c,
                Password: pass.pass_c,
                User: pass.user_c,
                Website: pass.website_c
            }
        });
        this.peticionRead();
    }

    handleForm = e => {
        e.persist();
        if (e.target.name === 'Password') {
            this.setState({
                form: {
                    ...this.state.form,
                    safetyMeter: safetyPass(e.target.value)
                }
            }, () => {
                console.log(this.state.form.safetyMeter)
            });
        }
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleToken = async e => {
        e.persist();
        await this.setState({
            authToken: e.target.value
        });
    }

    handleOnDragEnd = result => {

        if (!result.destination) return;

        const items = Array.from(this.state.data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        this.setState({ data: items })
    }

    safeCounter = () => {
        let count = 0;
        for (let index = 0; index < this.state.data.length; index++) {
            if (this.state.data[index].safe_c === 1) {
                count = + 1;
            }
        }
        let update = Math.round((100 * count / this.state.data.length) * 10) / 10
        this.setState({ safe: update })
    }

    sendMail = () => {
        const id = this.state.idUser
        const url = ("https://whalefare1.herokuapp.com/jwtauth/" + id)
        Axios.post(url).then((response) => {
            this.setState({ authorized: response.data.authorized })
        })
    }

    generatePassword = () => {
        const pwd = generator.generate({
            length: 12,
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: true
        });
        document.getElementById("Password").value = pwd;
    }

    showingPassword = (encryption) => {
        Axios.post('https://whalefare1.herokuapp.com/decryptpass',
            {
                password: encryption.pass_c,
                iv: encryption.key_c
            })
            .then((response) => {
                document.getElementById("pass" + encryption.id_c).value = response.data;
                document.getElementById("pass" + encryption.id_c).type = "text";
                document.getElementById("pass" + encryption.id_c).class = "fa fa-eye-slash";
            });
    };



    componentDidMount() {
        this.peticionRead();
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }
      
      handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
      }

    render() {
        const { form } = this.state;
        return (
            <div className="App">
                <br /><br /><br />
                <div className="container p-4">
                
                    <div className="col">
                    <button className="btn-add" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}><i class="fa  fa-plus  "/><br/></button>
                    </div>   
                        
                 <div>
                     <div className='conttt'>

                     </div>

                
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="passwords">
                            {(provided) => (
                                <List type="unstyled" className="row row-cols-3" {...provided.droppableProps} ref={provided.innerRef}>
                                    {this.state.data.map((pass, key) => {
                                        return (
                                            <Draggable key={String(pass.id_c)} draggableId={String(pass.id_c)} index={key}>
                                                {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                       {/*CABECERA CARDS*/}
                                                       <Col>      
                                                           {this.state.authorized !== 1 ?
                                                                /*PREVIO A AUTENTICACIÓN */
                                                                <Card>
                                                                    <Card.Body>
                                                                        <div className="mb-3">
                                                                            Da clic en la llave para verificar tu identidad y revisa tu correo.
                                                                        </div>
                                                                        <div>
                                                                            <button className="btn btn-success" onClick={() => { this.sendMail(); this.peticionRead(); }}><i className="fa fa-key" /></button>
                                                                        </div>
                                                                        </Card.Body>
                                                                        </Card>
                                                                    :
                                                                 /*MAPEO */
                                                                 <div id="PaymentForm">
                                                                   <Cards
                                                                    cvc={this.state.cvc}
                                                                    expiry={this.state.expiry}
                                                                    focused={this.state.focus}
                                                                    name={this.state.name}
                                                                    number={this.state.number}
                                                                    
                                                                    />
                                                                    <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(); this.modalInsertar() }}><i className="fa fa-pen" /></button>
                                                                    <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(); this.setState({ modalEliminar: true }) }}><i className="fa fa-trash" /></button>                                        
                                                                    <br></br>
                                                                    </div>
                                                                   
                                                                }
                                                        </Col>
                                                    </li>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </List>
                            )}
                        </Droppable>
                    </DragDropContext>
                    </div>                
                </div>
              
              {/*NUEVA TARJETA */}
                <Modal isOpen={this.state.modalInsertar} >
                    <ModalHeader style={{ display: 'block'}}>
                        <span style={{ float: 'right'}} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                    <Alert color="info"
                            isOpen={this.state.modalVal.modalValOpen}
                        >
                            <ValidationModal {...this.state.modalVal} />
                        </Alert>
                    {/*
                       this.state.idUser === null ?
                                <div>Acceso denegado</div>
                                :*/
                                <div>
                                <div id="PaymentForm">
                                <Cards
                                cvc={this.state.cvc}
                                expiry={this.state.expiry}
                                focused={this.state.focus}
                                name={this.state.name}
                                number={this.state.number}
                                />
                                
                                <br></br>
                                </div>
                                <div>
                                <Form.Group className="mb-3">
                                <Form.Label>Número de tarjeta</Form.Label>
                                <input style={{backgroundColor: '#cdd6e2'}} class="form-control" name="number" type="tel" placeholder="Card Number" onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Label>Nombre del propietario</Form.Label>
                                <input style={{backgroundColor: '#cdd6e2'}} class="form-control" name="name" type="tel" placeholder="Owner" onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Label>Caducidad</Form.Label>
                                <input style={{backgroundColor: '#cdd6e2'}} class="form-control" name="expiry" type="tel" placeholder="Card Number" onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}/>
                                 </Form.Group>
                                {this.state.checked ?
                                <p></p>
                                :
                                <Form.Group className="mb-3">
                               <Form.Label>CVC</Form.Label>
                               <input style={{backgroundColor: '#cdd6e2'}} class="form-control" name="cvc" type="tel" placeholder="CVC" onChange={this.handleInputChange}
                                   onFocus={this.handleInputFocus}/>
                               </Form.Group>
                            } 
                                <Switch
                                nativeControlId='my-switch'
                                checked={this.state.checked}
                                onChange={(e) => this.setState({checked: e.target.checked})} />
                               
                                <label htmlFor='my-switch'>Tarjeta digital</label>
                              

                            </div>
                            </div>
           }
                        </ModalBody>
                        <ModalFooter>
                        {
                            /*this.state.idUser === null ?
                                <div></div>
                                :
                               */
                                this.state.tipoModal === 'insertar' ?
                                 
                                    <Button className='btnnn' variant="primary" size="lg" onClick={() => this.peticionPost()}>
                                        Guardar
                                    </Button> :
                                   <Button className='btnnn' variant="primary" size="lg" onClick={() => this.peticionPut()}>
                                        Actualizar
                                    </Button>
                        }
                        <Button className="btnnn"  variant="danger" size="lg" onClick={() => this.modalInsertar()}>Salir</Button>
                        </ModalFooter> 
                </Modal>
        
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar la tarjeta {form && form.Title}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};

export default withRouter(Homet);