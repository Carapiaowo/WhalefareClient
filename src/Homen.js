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
        modalAyuda: false,
        modalCategorias: false,
        popOver: false,
        modalVal: {
            modalValOpen: false,
            modalValType: '',
        },
        tipoModal: '',
        idUser: this.context.isLogged.id,
        title: '',
        category: '',
        content: '',
        id_n: 0
    }

    //Insertar nueva nota
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
        this.peticionRead();
    }

    //Ventana de ayuda
    modalAyuda = () => {
        this.setState({ modalAyuda : !this.state.modalAyuda});
    }

    //Gestion de nombre-categoría 
    modalCategorias = () => {
        this.setState({ modalCategorias : !this.state.modalCategorias});
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

        // if (this.state.idUser) {
        this.setState({ data: [] })
        Axios.post("http://localhost:4000/readnote", { id_u: 235 }).then(response => {
            this.setState({ data: response.data.result, authorized: response.data.authorized[0].authorized_u });
        }).catch(error => {
            console.log(error.message);
        })
        //}
    }

    peticionPost = async () => {
        /*
                if (validation === true) {
                    if (this.state.idUser !== null) {
                        */
        await Axios.post("http://localhost:4000/addnote", {
            title_n: this.state.title,
            category_n: this.state.selectedColor,
            content_n: this.state.content,
            id_u: 235
        }).then(response => {
            this.modalInsertar();
        }).catch(error => {
            console.log(error.message);
        })

        /*}
        
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
    */
    }

    peticionPut = async () => {
        let url = ("http://localhost:4000/editnote/" + this.state.id_n)
        /*
        if (validation === true) {*/
        this.modalInsertar();
        await Axios.put(url, {
            title_n: this.state.title,
            category_n: this.state.selectedColor,
            content_n: this.state.content
        }).then(response => {
            this.modalInsertar();
        }).catch(error => {
            console.log(error.message);
        })

        /*
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
     */
    }

    peticionDelete = () => {
        const url = "http://localhost:4000/deletenote/" + this.state.id_n
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
        var { id_n, title_n, content_n, category_n } = cards
        this.setState({
            tipoModal: 'actualizar',
            id_n: id_n,
            title: title_n,
            content: content_n,
            selectedColor: category_n,
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

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                document.getElementById("pass" + encryption.id_c).className = "fa fa-eye-slash";
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
                        <button className="btn-add" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}><i className="fa fa-plus" /><br /></button>
                        <button className="btn-help" onClick={() => { this.setState({ form: null, tipoModal: 'ayuda' }); this.modalAyuda() }}><i class="fa fa-question  "/><br/></button>
                        <button id="cat" className="btn-cat" onClick={() => { this.setState({ form: null, tipoModal: 'categorias' }); this.modalCategorias() }}><i class="fa fa-bookmark"/><br/></button>
                    </div>  <div>
                        <div className='conttt'></div>
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId="passwords">
                                {(provided) => (
                                    <List type="unstyled" className="row row-cols-3" {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.data.map((notes, key) => {
                                            return (
                                                <Draggable key={String(notes.id_n)} draggableId={String(notes.id_n)} index={key}>
                                                    {(provided) => (
                                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <Col>
                                                                <Card>
                                                                    <Card.Header style={{ display: 'block', backgroundColor: notes.category_n }} ></Card.Header>
                                                                    {this.state.authorized === 1 ?
                                                                        /*PREVIO A AUTENTICACIÓN 
                                                                        <Card.Body>
                                                                            <div className="mb-3">
                                                                                Da clic en la llave para verificar tu identidad y revisa tu correo.
                                                                            </div>
                                                                            <div>
                                                                                <button className="btn btn-success" onClick={() => { this.sendMail(); this.peticionRead(); }}><i className="fa fa-key" /></button>
                                                                            </div>
                                                                        </Card.Body>
                                                                        */
                                                                        console.log('Algo xd')
                                                                        :
                                                                        /*MAPEO */
                                                                        <Card.Body>
                                                                            <Form.Group className="mb-3">
                                                                                <Form.Label>Título</Form.Label>
                                                                                <Form.Control name="Title"
                                                                                    id={''}
                                                                                    className="campo"
                                                                                    disabled={true}
                                                                                    value={notes.title_n ? notes.title_n : ''} />
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-3">
                                                                                <Form.Label>Contenido</Form.Label>
                                                                                <Form.Control name="Content" id={''} className='camponota' disabled={true}
                                                                                    value={notes.content_n ? notes.content_n : ''} />

                                                                            </Form.Group>
                                                                            <div>
                                                                                <br />
                                                                                {/*BOTONES EDITAR Y ELIMINAR */}
                                                                                <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(notes); this.modalInsertar() }}><i className="fa fa-pen" /></button>
                                                                                <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(notes); this.setState({ modalEliminar: true }) }}><i className="fa fa-trash" /></button>
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
                    <ModalHeader style={{ display: 'block', backgroundColor: this.state.selectedColor }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody style={{ backgroundColor: this.state.selectedColor + '15' }}>
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
                                    <Form.Control className='campo' name="title" type="text" placeholder="Escribe aquí." onChange={this.handleInputChange}
                                        value={this.state.title ? this.state.title : ''} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contenido</Form.Label>
                                    <Form.Control className='camponota' name="content" as="textarea" placeholder="Escribe aquí." onChange={this.handleInputChange}
                                        value={this.state.content ? this.state.content : ''} />
                                    <div id="p1">

                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="exampleColorInput">Marcador </Form.Label><i className="fa fa-info-circle" type="button" id="Popover1"></i>
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
                                    <TwitterPicker
                                        triangle='hide'
                                        color={this.state.selectedColor}
                                        onChangeComplete={this.handleChangeComplete}
                                    />
                                </Form.Group>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: this.state.selectedColor + '10' }}>
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
                        ¿Estás seguro que deseas eliminar la tarjeta de {form && form.Title}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalAyuda}>
                    <ModalHeader>
                    ¿Necesitas ayuda?
                    </ModalHeader>
                    <ModalBody>
                    1. Agrega una contraseña presionando "+".
                    <br></br>
                    2. Edita tus contraseñas con "<i className="fa fa-pen" />".
                    <br></br> 
                    3. Presiona y arrastra para mover una contraseña.
                    
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalAyuda: false })}>Salir</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalCategorias}>
                    <ModalHeader>
                    Mis marcadores
                    <i class="fa fa-bookmark" style={{ color: this.state.selectedColor, marginLeft: 10, fontSize:20}}/>
                    </ModalHeader>
                    <ModalBody>
                    <p style={{fontSize:15}}>Utiliza marcadores para categorizar tus notas.</p>
                    <br></br>
                    <Form.Group className="mb-3">
                        <Form.Label><b>1.</b> Selecciona el color para el marcador.</Form.Label>
                        <TwitterPicker
                                        triangle='hide'
                                        color={this.state.selectedColor}
                                        onChangeComplete={this.handleChangeComplete}
                                    />
                                </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>2. Asigna un nombre de categoría al marcador.</Form.Label>
                                    <Form.Control className='campo' maxLength={30} name="titleeee" type="text" placeholder="*nombre de la categoria*" onChange={this.handleInputChange}
                                        value=" " />
                                </Form.Group>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-secundary" >Guardar</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({modalCategorias: false })}>Salir</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};

export default withRouter(Homen);