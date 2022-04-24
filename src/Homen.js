import React, { Component } from 'react';
import generator from "generate-password";
import { withRouter } from 'react-router-dom';
import { Col, Form, Button, Card, Dropdown } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, ModalBody, ModalFooter, ModalHeader, Alert, List, Popover, PopoverBody, PopoverHeader, ListGroup } from 'reactstrap';
import { notes } from './validation';
import ValidationModal from './ValidationModal';
import { AuthContext } from './Auth/AuthContext'
import { TwitterPicker } from 'react-color'
import Axios from 'axios';

class Homen extends Component {
    static contextType = AuthContext;
    state = {
        selectedColor: '#ABB8C3',
        data: [],
        categories: [],
        authorized: false,
        modalInsertar: false,
        modalEliminar: false,
        modalAyuda: false,
        modalCategorias: false,
        nuevaCategoria: false,
        editarCategorias: false,
        eyehide: false,
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
        id_n: 0,
        id_nc: 0
    }

    //Insertar nueva nota
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
        this.peticionRead();
    }

    //Ventana de ayuda
    modalAyuda = () => {
        this.setState({ modalAyuda: !this.state.modalAyuda });
    }

    //Ventana categorías
    modalCategorias = () => {
        this.setState({ modalCategorias: !this.state.modalCategorias });
    }

    handleChangeComplete = (color) => {
        this.setState({ selectedColor: color.hex });
    };

    handleCategory = (e) => {
        console.log(e)
        this.setState({
            category: e.name_nc,
            selectedColor: e.color_nc,
            id_nc: e.id_nc
        });

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
            Axios.post("https://whalefare1.herokuapp.com/readnote", { id_u: this.state.idUser }).then(response => {
                this.setState({ data: response.data.result, authorized: response.data.authorized[0].authorized_u });
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    peticionPost = async () => {
        let form = {
            content: this.state.content,
            name: this.state.title,
            color: this.state.id_nc
        }
        let validation = notes(form)
        if (validation === true) {
            if (this.state.idUser !== null) {

                await Axios.post("https://whalefare1.herokuapp.com/addnote", {
                    title_n: this.state.title,
                    id_nc: this.state.id_nc,
                    content_n: this.state.content,
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
        let url = ("https://whalefare1.herokuapp.com/editnote/" + this.state.id_n)
        let form = {
            content: this.state.content,
            name: this.state.title,
            color: this.state.id_nc
        }
        let validation = notes(form)
        if (validation === true) {
            this.modalInsertar();
            console.log(this.state.title, this.state.id_nc, this.state.content)

            await Axios.put(url, {
                title_n: this.state.title,
                id_nc: this.state.id_nc,
                content_n: this.state.content
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
        const url = "https://whalefare1.herokuapp.com/deletenote/" + this.state.id_n
        Axios.delete(url).then(response => {
            this.modalInsertar()
        })
        this.setState({ modalEliminar: false });
        this.peticionRead();
    }

    categoryPost = () => {
        Axios.post('https://whalefare1.herokuapp.com/addcategory', {
            name_nc: this.state.category,
            color_nc: this.state.selectedColor,
            id_u: this.state.idUser
        }
        ).then(response => {
            this.categoryRead()
        })
    }

    categoryRead = () => {
        if (this.state.idUser) {
            Axios.post('https://whalefare1.herokuapp.com/readcategory', { id_u: this.state.idUser }).then(response => {
                this.setState({ categories: response.data.result, authorized: response.data.authorized[0].authorized_u });
            })
        }
    }

    categoryPut = (e) => {
        Axios.put('https://whalefare1.herokuapp.com/editcategory/' + e, {
            name_nc: this.state.category,
            color_nc: this.state.selectedColor
        }).then(response => {
            this.categoryRead()
        })
        this.setState({ editarCategorias: !this.state.editarCategorias })
    }

    categoryDelete = (e) => {
        Axios.delete('https://whalefare1.herokuapp.com/deletecategory/' + e)
        this.categoryRead()
        this.setState({
            category: "",
            selectedColor: "",
            id_nc: 0
        });
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
        var { id_n, title_n, content_n, id_nc } = cards
        console.log(id_nc)
        this.setState({
            tipoModal: 'actualizar',
            id_n: id_n,
            title: title_n,
            content: content_n,
            id_nc: id_nc,
        });
        let category = {
            name_nc: this.selectedCategoryName(cards),
            color_nc: this.selectedCategoryColor(cards),
            id_nc: id_nc
        }
        this.handleCategory(category)
        this.peticionRead();
    }

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


    selectedCategoryColor = (e) => {
        let categories = Object.values(this.state.categories)
        const id_nota = e.id_nc

        for (let i = 0; i < categories.length; i++) {
            const id_categoria = categories[i].id_nc
            if (id_nota === id_categoria) {
                return (this.state.categories[i].color_nc)
            }
        }
    }

    selectedCategoryName = (e) => {
        let categories = Object.values(this.state.categories)
        const id_nota = e.id_nc

        for (let i = 0; i < categories.length; i++) {
            const id_categoria = categories[i].id_nc
            if (id_nota === id_categoria) {
                return (this.state.categories[i].name_nc)
            }
        }
    }

    componentDidMount() {
        this.peticionRead();
        this.categoryRead();
    }

    render() {
        const { form } = this.state;
        return (
            <div className="App">
                <br /><br /><br />
                <div className="container p-4">
                    <div className="col">
                        <button className="btn-add" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); this.categoryRead(); }}><i className="fa fa-plus" /><br /></button>
                        <button className="btn-help" onClick={() => { this.setState({ form: null, tipoModal: 'ayuda' }); this.modalAyuda() }}><i className="fa fa-question  " /><br /></button>
                        <button id="cat" className="btn-cat" onClick={() => { this.setState({ form: null, tipoModal: 'categorias' }); this.modalCategorias(); this.categoryRead(); }}><i className="fa fa-bookmark" /><br /></button>
                    </div>
                    <div>
                        {
                            //If para evitar el repetición de autenticación de llaves
                            !this.state.authorized ?
                                /*PREVIO A AUTENTICACIÓN (corregido 1.0 c:)*/
                                <div>
                                    Dando clic en el ojo debajo a la derecha te enviaremos un correo para que puedas acceder a tu contenido almacenado.
                                    <div className="mb-3">
                                        {this.state.authorized ?
                                            <div />
                                            :
                                            <button className='btn-eye' onClick={() => { this.setState({ eyehide: !this.state.eyehide }); this.sendMail(); this.peticionRead(); }}>
                                                <i className='fa fa-eye'></i>
                                            </button>
                                        }
                                    </div>
                                </div>
                                :
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
                                                                        <Card className='nota'>
                                                                            <Card.Header style={{ display: 'block', backgroundColor: this.selectedCategoryColor(notes) }} >
                                                                                {this.selectedCategoryName(notes)}
                                                                            </Card.Header>
                                                                            {
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
                                                                                        <div className='contBtnN'>
                                                                                            <Button className='btnN' variant='light' onClick={() => { this.seleccionarEmpresa(notes); this.modalInsertar() }}><i className="fa fa-pen" /></Button>
                                                                                            <Button className='btnN' variant='light' onClick={() => { this.seleccionarEmpresa(notes); this.setState({ modalEliminar: true }) }}><i className="fa fa-trash" /></Button>
                                                                                        </div>
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
                        }
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
                            this.state.idUser === null ?
                                <div>Acceso denegado</div>
                                :
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
                                                    Utiliza marcadores para organizar tus notas.
                                                </PopoverBody>
                                            </Popover>
                                        </div>
                                        <Dropdown>
                                            {
                                                this.state.category ?
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <i className="fa fa-bookmark" style={{ color: this.state.selectedColor, marginLeft: 10, fontSize: 20 }} />{this.state.category}
                                                    </Dropdown.Toggle>
                                                    :
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Selecciona una categoría
                                                    </Dropdown.Toggle>


                                            }
                                            <Dropdown.Menu>
                                                {this.state.categories.map((categories, key) => {
                                                    return (
                                                        <Dropdown.Item id={categories.id_nc} index={key} onClick={() => { this.handleCategory(categories) }}><i className="fa fa-bookmark" style={{ color: categories.color_nc, marginLeft: 10, fontSize: 20 }} />{categories.name_nc}</Dropdown.Item>
                                                    )
                                                })
                                                }
                                            </Dropdown.Menu>

                                        </Dropdown>
                                    </Form.Group>
                                </div>
                        }
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: this.state.selectedColor + '10' }}>
                        {
                            this.state.idUser === null ?
                                <div></div>
                                :

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
                        ¿Estás seguro que deseas eliminar la nota {this.state.title} de {this.state.category}?
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
                        <li type='disc'>Agrega una nota presionando <i className="fa fa-plus" />.</li>
                        <li type='disc'>Edita una nota presionando <i className="fa fa-pen" />.</li>
                        <li type='disc'>Presiona y arrastra un contenedor para moverlo.</li>
                        <li type='disc'>Organiza tus marcadores con <i className="fa fa-bookmark" />.</li>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn' variant='secondary' onClick={() => this.setState({ modalAyuda: false })}>Salir</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalCategorias}>
                    <ModalHeader >
                        Mis marcadores
                        <i className="fa fa-bookmark" style={{ color: this.state.selectedColor, marginLeft: 10, fontSize: 20 }} />
                    </ModalHeader>
                    <ModalBody>
                        <p style={{ fontSize: 15 }}>Utiliza marcadores para categorizar tus notas.</p>
                        <table className="table table-sm">
                            <tbody>
                                {

                                    //Mapeo de categorías
                                    this.state.categories.map((categories, key) => {
                                        return (
                                            <div>
                                                <tr index={key}>
                                                    <th scope="row"><i className="fa fa-bookmark" style={{ color: categories.color_nc, marginLeft: 10, fontSize: 20 }} /></th>
                                                    <td>{categories.name_nc}</td>
                                                    <td>
                                                        {
                                                            //En categoryPut cambiar id_n por el mapeo
                                                            this.state.editarCategorias ?

                                                                <Button className='botonesC' variant='light' onClick={() => this.categoryPut(categories.id_nc)}>
                                                                    Guardar
                                                                </Button>
                                                                :
                                                                <Button className='botonesC' variant='light' onClick={() => this.setState({ editarCategorias: !this.state.editarCategorias })}>
                                                                    Editar
                                                                </Button>
                                                        }
                                                    </td>
                                                    <td><Button className='botonesN' variant='light' onClick={() => { this.categoryDelete(categories.id_nc) }}><i className="fa fa-trash" /></Button></td>
                                                </tr>
                                            </div>
                                        )
                                    })
                                }



                            </tbody>

                        </table>
                        {this.state.editarCategorias ?
                            <></>
                            :
                            <>
                                {
                                    this.state.authorized ?
                                        <><Button className='botonesN' variant='light' onClick={() => { this.setState({ nuevaCategoria: true }) }}><i className="fa fa-plus" />
                                        </Button><br></br></>
                                        :
                                        <></>
                                }
                            </>
                        }

                        {this.state.editarCategorias || this.state.nuevaCategoria ?
                            <>
                                <br></br>
                                <Form.Group className="mb-3">
                                    <Form.Label><b>1.</b> Selecciona el color para el marcador.</Form.Label>
                                    <TwitterPicker
                                        triangle='show'
                                        color={this.state.selectedColor}
                                        onChangeComplete={this.handleChangeComplete}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>2. Asigna un nombre de categoría al marcador.</Form.Label>
                                    <Form.Control className='campo' name="category" type="text" placeholder="Escribe aquí." maxLength={30} onChange={this.handleInputChange} />
                                </Form.Group>
                                {this.state.nuevaCategoria ?
                                    <><Button className='btn' variant='secondary' onClick={this.categoryPost}>Añadir</Button></>
                                    :
                                    <></>
                                }

                            </>
                            :
                            <>

                            </>}
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: '#f3fafe' }}>
                        <Button className='btnnn' variant="danger" onClick={() => this.setState({ modalCategorias: false, editarCategorias: false, nuevaCategoria: false })}>Salir</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
};

export default withRouter(Homen);