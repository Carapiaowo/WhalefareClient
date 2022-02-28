import React, { Component} from 'react';
import { useState } from "react";
import generator from "generate-password";
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, ModalBody, ModalFooter, ModalHeader, Alert, List, Progress, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { formVal, safetyPass } from './validation';
import ValidationModal from './ValidationModal';
import { AuthContext } from './Auth/AuthContext'
import Modal1 from "./components/Modal";
import Modal2 from "./components/Modal2";
import Axios from 'axios';

class Home extends Component {
    static contextType = AuthContext;
    state = {
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
            Axios.post("https://whalefare.herokuapp.com/read", { id_u: this.state.idUser }).then(response => {
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
                await Axios.post("https://whalefare.herokuapp.com/add", {
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
        let url = ("https://whalefare.herokuapp.com/edit/" + this.state.form.id_c)
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
        const url = "https://whalefare.herokuapp.com/delete/" + this.state.form.id_c
        Axios.delete(url).then(response => {

        })
        this.setState({ modalEliminar: false });
        this.peticionRead();
    }

    decryptedPassword = (encryption) => {
        Axios.post('https://whalefare.herokuapp.com/decryptpass',
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
        const url = ("https://whalefare.herokuapp.com/jwtauth/" + id)
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
        Axios.post('https://whalefare.herokuapp.com/decryptpass',
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
                    <div>
                        <div className="container" onMouseEnter={this.safeCounter}>
                            <div className="row justify-content-evenly">
                                <div className="col-2 text-success">
                                    <strong>Seguras <br />{(this.state.safe)}%</strong>
                                </div>
                                <div className="col-2 text-dark">
                                    <strong>Inseguras <br />{100 - (this.state.safe)}%</strong>
                                </div>
                            </div>

                        </div>


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
                                                        <div className="col">
                                                            <div className="card">
                                                                <div className='center-text'>
                                                                    <h3 className="card-header bg-dark text-white">{pass.title_c}</h3>
                                                                </div>
                                                                {this.state.authorized !== 1 ?
                                                                    <div className="card-body">
                                                                        <div className="mb-3">
                                                                            Da clic en la llave para verificar tu identidad y revisa tu correo.
                                                                        </div>
                                                                        <div>
                                                                            <button className="btn btn-success" onClick={() => { this.sendMail(); this.peticionRead(); }}><i className="fa fa-key" /></button>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className="card-body">
                                                                        <label>Titulo</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="Title"
                                                                                id={"title" + pass.id_c}
                                                                                className="form-control"
                                                                                disabled={true}
                                                                                value={pass.title_c}
                                                                            />
                                                                        </div>
                                                                        <label>Nombre de usuario</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="User"
                                                                                id={"user" + pass.id_c}
                                                                                className="form-control"
                                                                                disabled={true}
                                                                                value={pass.user_c}
                                                                            />
                                                                        </div>
                                                                        <label>Contraseña</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="Password"
                                                                                type={'password'}
                                                                                id={"pass" + pass.id_c}
                                                                                className="form-control"
                                                                                disabled={true}
                                                                                defaultValue={pass.pass_c}
                                                                            />
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
                                                                        </div>
                                                                        <label>Sitio web</label>
                                                                        <div className="mb-3 input-group">
                                                                            <input
                                                                                name="Website"
                                                                                id={"web" + pass.id_c}
                                                                                className="form-control"
                                                                                disabled={true}
                                                                                value={pass.website_c}
                                                                            />

                                                                        </div>
                                                                        <div>
                                                                            <br />
                                                                            <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(pass); this.modalInsertar() }}><i className="fa fa-pen" /></button>
                                                                            <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(pass); this.setState({ modalEliminar: true }) }}><i className="fa fa-trash" /></button>
                                                                        </div>
                                                                    </div>
                                                                }

                                                            </div>
                                                        </div>
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
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar contraseña</button>

                <Modal isOpen={this.state.modalInsertar}>

                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <Alert color="info"
                            isOpen={this.state.modalVal.modalValOpen}
                        >
                            <ValidationModal {...this.state.modalVal} />
                        </Alert>
                        {
                            this.state.idUser === null ?
                                <div>Acceso denegado papu Bv</div>
                                :
                                <div className="form-group">
                                    <label htmlFor="nombre">Título</label>
                                    <input className="form-control" type="text" name="Title" id="Title" onChange={this.handleForm} value={form ? form.Title : ''} disabled={false} />
                                    <br />
                                    <label htmlFor="nombre">Usuario</label>
                                    <input className="form-control" type="text" name="User" id="User" onChange={this.handleForm} value={form ? form.User : ''} disabled={false} />
                                    <br />
                                    <label htmlFor="nombre">Contraseña</label><i className="fa fa-info-circle" type="button" id="Popover1"></i>
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
                                    <div className="input-group">
                                        <input className="form-control" type="text" name="Password" id="Password" onChange={this.handleForm} value={form ? form.Password : ''} disabled={false} />
                                        <span
                                            className="input-group-text"
                                            onClick={() => { this.generatePassword() }}
                                        >
                                            <i className="fa fa-dice"
                                                aria-hidden="true">
                                            </i>
                                        </span>
                                    </div>
                                    <div id="p1"></div>
                                    <br />
                                    <label htmlFor="nombre">Sitio web</label>
                                    <input data-toggle="tooltip" data-placement="top" title="e.g. www.youtube.com" className="form-control" type="text" name="Website" id="Website" onChange={this.handleForm} value={form ? form.Website : ''} disabled={false} />
                                </div>
                        }

                    </ModalBody>

                    <ModalFooter>
                        {
                            this.state.idUser === null ?
                                <div></div>
                                :
                                this.state.tipoModal === 'insertar' ?
                                    <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                        Insertar
                                    </button> :
                                    <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                        Actualizar
                                    </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Salir</button>
                    </ModalFooter>

                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar la contraseña de {form && form.Title}?
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

export default withRouter(Home);