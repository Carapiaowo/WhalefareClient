import React, { Component } from 'react';
import generator from "generate-password";
import { withRouter } from 'react-router-dom';
import { Col, Form, Button, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, ModalBody, ModalFooter, ModalHeader, Alert, List, Progress, Popover, PopoverBody, PopoverHeader, CardBody } from 'reactstrap';
import { formVal, safetyPass } from './validation';
import ValidationModal from './ValidationModal';
import { AuthContext } from './Auth/AuthContext'
import { TwitterPicker } from 'react-color'
import Axios from 'axios';

class Homen extends Component {
    static contextType = AuthContext;
    state = {
        selectedColor: '#ABB8C3',
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

    handleChangeComplete = (color) => {
        this.setState({ selectedColor: color.hex });
      };

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

    render() {
        const { form } = this.state;
        return (
            <div className="App">
                <br /><br /><br />
                <div className="container p-4">  
                    <div className="col">                         
                    <button className="btn-add" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}><i class="fa  fa-plus  "/><br/></button>
                    </div>  <div>
                     <div className='conttt'></div>
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="passwords">
                            {(provided) => (
                                <List type="unstyled" className="row row-cols-3" {...provided.droppableProps} ref={provided.innerRef}>
                                    {this.state.data.map((pass, key) => {
                                        return (
                                            <Draggable key={String(pass.id_c)} draggableId={String(pass.id_c)} index={key}>
                                                {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Col>
                                                            <Card>           
                                                                    <Card.Header style={{ display: 'block', backgroundColor:this.state.selectedColor}} ></Card.Header>
                                                                {this.state.authorized !== 1 ?
                                                                /*PREVIO A AUTENTICACIÓN */
                                                                    <Card.Body>
                                                                        <div className="mb-3">
                                                                            Da clic en la llave para verificar tu identidad y revisa tu correo.
                                                                        </div>
                                                                        <div>
                                                                            <button className="btn btn-success" onClick={() => { this.sendMail(); this.peticionRead(); }}><i className="fa fa-key" /></button>
                                                                        </div>
                                                                        </Card.Body>
                                                                    :
                                                                 /*MAPEO */
                                                                    <Card.Body>
                                                                     <Form.Group className="mb-3">
                                                                     <Form.Label>Título</Form.Label>
                                                                     <Form.Control  name="Title"
                                                                                id={''}
                                                                                className="campo"
                                                                                disabled={true}
                                                                                value={''}/>
                                                                     </Form.Group>
                                                                     <Form.Group className="mb-3">
                                                                     <Form.Label>Contenido</Form.Label>
                                                                     <Form.Control name="Content" id={''} className='camponota'  disabled={true}
                                                                                value={''}/>
                                                                     <span
                                                                                className="input-group-text"
                                                                            >
                                                                                <i id={"eye" + pass.id_c}
                                                                                    className="fa fa-eye"
                                                                                    aria-hidden="true"
                                                                                    onClick={() => { this.showingPassword(pass); }}
                                                                                >
                                                                                </i>
                                                                            </span>
                                                                     </Form.Group>
                                                                     <div>
                                                                            <br />
                                                                            {/*BOTONES EDITAR Y ELIMINAR */}
                                                                            <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(pass); this.modalInsertar() }}><i className="fa fa-pen" /></button>
                                                                            <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(pass); this.setState({ modalEliminar: true }) }}><i className="fa fa-trash" /></button>
                                                                        </div>
                                                                </Card.Body>
                                                                }
                                                            </Card>
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
              
                <Modal isOpen={this.state.modalInsertar} >
                    <ModalHeader style={{ display: 'block', backgroundColor:this.state.selectedColor}}>
                        <span style={{ float: 'right'}} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody style={{backgroundColor:this.state.selectedColor+'15'}}>
                        <Alert color="info"
                            isOpen={this.state.modalVal.modalValOpen}
                        >
                            <ValidationModal {...this.state.modalVal} />
                        </Alert>
                        {
                           /* this.state.idUser === null ?
                                <div>Acceso denegado</div>
                                :*/
                                /* CONTENEDOR NUEVA NOTA */
                                <div className="mb-3">
                                <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control className='campo' name="title" type="text" placeholder="Escribe aquí." onChange={this.handleForm} value={form ? form.Title : ''} disabled={false} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Label>Contenido</Form.Label>
                                <Form.Control className='camponota' id="Content" as="textarea" placeholder="Escribe aquí." onChange={(event) => {
                                  
                                }} />
                                <div id="p1">
    
                                </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="exampleColorInput">Marcador</Form.Label><i className="fa fa-info-circle" type="button" id="Popover1"></i>
                                        <TwitterPicker
                                        triangle='hide'
                                        color={this.state.selectedColor}
                                        onChangeComplete={this.handleChangeComplete}
                                        />
                                    <div>
                                        <Popover
                                            flip
                                            isOpen={this.state.popOver}
                                            target="Popover1"
                                            toggle={() => { this.setState({ popOver: !this.state.popOver }) }}
                                        >
                                            <PopoverHeader>
                                                Sugerencias
                                            </PopoverHeader>
                                            <PopoverBody>
                                                Te recomendamos usar contraseñas que contengan mayúsculas y minúsculas, signos de puntuación (<i>@</i>, <i>$</i>, <i>!</i>, <i>%</i>, <i>*</i>, <i>#</i>, <i>?</i>, <i>.</i>, <i>:</i>, <i>;</i>) y números.
                                            </PopoverBody>
                                        </Popover>
                                    </div>

                                    </Form.Group>
                                </div>
                        }
                        </ModalBody>
                        <ModalFooter style={{backgroundColor:this.state.selectedColor+'10'}}>
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
                        ¿Estás seguro que deseas eliminar la tarjeta de {form && form.Title}?
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

export default withRouter(Homen);