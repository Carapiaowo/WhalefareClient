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
        id_t: 0,
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        data: [],
        eyehide:false,
        authorized: false,
        modalInsertar: false,
        modalEliminar: false,
        modalAyuda: false,
        popOver: false,
        modalVal: {
            modalValOpen: false,
            modalValType: '',
        },
        tipoModal: '',
        idUser: this.context.isLogged.id,
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
        this.handleInputFocusCVC();
        this.peticionRead();
    }

     //Ventana de ayuda
     modalAyuda = () => {
        this.setState({ modalAyuda : !this.state.modalAyuda});
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



    peticionRead = () => {
        /*
        descomentar para deploy
        if (this.state.idUser) {
        */
        this.setState({ data: [] })
        Axios.post("http://localhost:4000/readcard", { id_u: 235 }).then(response => {
            this.setState({ data: response.data.result, authorized: response.data.authorized[0].authorized_u });
            console.log(this.state.data)
        }).catch(error => {
            console.log(error);
        })
        /*
        descomentar para deploy
            }
        */
    }

    peticionPost = async () => {
        /*
               cambiar el id_u para deploy 
               y el if a 
               this.state.idUser !== null
               */
        if (1 === 1) {
            console.log('Añadiendo tarjeta')
            await Axios.post("http://localhost:4000/addcard", {
                number_t: this.state.number,
                owner_t: this.state.name,
                cvv_t: this.state.cvc,
                cad_t: this.state.expiry,
                id_u: 235

            }).then(response => {

                this.modalInsertar();
            }).catch(error => {
                console.log(error.message);
            })
        }

    }

    peticionPut = async () => {
        let url = ("http://localhost:4000/editcard/" + this.state.id_t)

        //if (validation === true) {

        this.modalInsertar();
        await Axios.put(url, {
            number_t: this.state.number,
            owner_t: this.state.name,
            cvv_t: this.state.cvc,
            cad_t: this.state.expiry
        }).then(response => {
            this.modalInsertar();
        }).catch(error => {
            console.log(error.message);
        })

        /* } else {
        this.onShowAlert()
        this.setState({
            modalVal: {
                modalValType: validation,
                modalValOpen: true
            }
        }, () => {
        })
        }*/
    }

    peticionDelete = () => {
        const url = "http://localhost:4000/deletecard/" + this.state.id_t
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

    seleccionarEmpresa = (cards) => {
        var { id_t, owner_t, number_t, cvv_t, cad_t } = cards
        this.setState({
            tipoModal: 'actualizar',
            id_t: id_t,
            name: owner_t,
            number: number_t,
            cvc: cvv_t,
            expiry: cad_t

        });

        this.peticionRead();
    }
    /*
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
    */
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

    handleInputFocusCVC = (e) => {
        this.setState({ focus: 'number' });
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
                   <button className='btn-eye' onClick={() => {this.setState({eyehide: !this.state.eyehide})}}>
                   {this.state.eyehide ?
                    <i className='fa fa-eye'></i>
                    :
                    <i className='fa fa-eye-slash'></i>
                }</button>
                    <button className="btn-help" onClick={() => { this.setState({ form: null, tipoModal: 'ayuda' }); this.modalAyuda() }}><i class="fa fa-question  "/><br/></button>
                    <button className="btn-add" onClick={() => { this.setState({ cvc: '', name: '', number: '', expiry: '', tipoModal: 'insertar' }); this.modalInsertar() }}><i className="fa  fa-plus  " /><br /></button>
                    </div> 
                    <div>
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId="passwords">
                                {(provided) => (
                                    <List type="unstyled" className="row row-cols-3" {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.data.map((cards, key) => {
                                            return (
                                                <Draggable key={String(cards.id_t)} draggableId={String(cards.id_t)} index={key}>
                                                    {(provided) => (
                                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            {/*CABECERA CARDS*/}
                                                            <Col>
                                                                {this.state.authorized === 1 ?
                                                                    
                                                                    
                                                                    /*PREVIO A AUTENTICACIÓN
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
                                                                     */
                                                                    console.log(':)')
                                                                    :
                                                                    /*MAPEO */
                                                                    <div id="PaymentForm" className='tarjeta'>
                                                                        <Cards
                                                                            cvc={cards.cvv_t}
                                                                            expiry={cards.cad_t}
                                                                            focused={this.state.focus}
                                                                            name={cards.owner_t}
                                                                            number={cards.number_t}

                                                                        />
                                                                        <div className='contBtn'>
                                                                        <Button className='botonesN' variant='light' onClick={() => { this.seleccionarEmpresa(cards); this.modalInsertar() }}><i className="fa fa-pen" /></Button>
                                                                        <Button className='botonesN' variant='light' onClick={() => { this.seleccionarEmpresa(cards); this.setState({ modalEliminar: true }) }}><i className="fa fa-trash" /></Button>
                                                                        </div>
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
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
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
                                {this.state.checked ?
                                        <p></p>
                                        :
                                        <Form.Group className="mb-3">
                                            <Form.Label>CVC</Form.Label>
                                            <input style={{ backgroundColor: '#cdd6e2' }} className="form-control" name="cvc" type="number" max="999" placeholder="CVC" onChange={this.handleInputChange}
                                                onFocus={this.handleInputFocus} value={this.state.cvc ? this.state.cvc : ''} />
                                        </Form.Group>
                                    }
                                    <Form.Group className="mb-3">
                                        <Form.Label>Número de tarjeta</Form.Label>
                                        <input style={{ backgroundColor: '#cdd6e2' }} className="form-control" name="number" type="number" min="0" placeholder="Card Number" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} value={this.state.number ? this.state.number : ''} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre del propietario</Form.Label>
                                        <input style={{ backgroundColor: '#cdd6e2' }} className="form-control" name="name" placeholder="Owner" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} value={this.state.name ? this.state.name : ''} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Caducidad</Form.Label>
                                        <input style={{ backgroundColor: '#cdd6e2' }} className="form-control" name="expiry" type="number" placeholder="Vencimiento" onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus} value={this.state.expiry ? this.state.expiry : ''} />
                                    </Form.Group>
                                    
                                    <Switch
                                        nativeControlId='my-switch'
                                        checked={this.state.checked}
                                        onChange={(e) => this.setState({ checked: e.target.checked })} />

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
                        <Button className="btnnn" variant="danger" size="lg" onClick={() => this.modalInsertar()}>Salir</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar la tarjeta?
                    </ModalBody>
                    <ModalFooter>
                    <Button className="btn" variant="light" onClick={() => this.peticionDelete()}>Sí</Button>
                    <Button className="btn" variant='secondary' onClick={() => this.setState({ modalEliminar: false })}>No</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalAyuda}>
                    <ModalHeader>
                    ¿Necesitas ayuda?
                    </ModalHeader>
                    <ModalBody>                    
                    <li type='disc'>Agrega una tarjeta presionando <i className="fa fa-plus" />.</li>
                    <li type='disc'>Edita una tarjeta presionando <i className="fa fa-pen" />.</li> 
                    <li type='disc'>Presiona y arrastra una tarjeta para moverla.</li>               
                    </ModalBody>
                    <ModalFooter>
                    <Button className='btn' variant='secondary' onClick={() => this.setState({ modalAyuda: false })}>Salir</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};

export default withRouter(Homet);