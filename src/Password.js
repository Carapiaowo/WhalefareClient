import React, { useState } from 'react';
/*
import {
    NavLink
} from 'react-router-dom'
*/
import Axios from 'axios';

function Password(props) {

    const [clicked, setClicked] = useState(true);
    const [boo, setBoo] = useState(true);

    const [Password, setPassword] = useState();
    const [User, setUser] = useState("");
    const [Website, setWebsite] = useState("");
    const [Title, setTitle] = useState("");

    const hidePass = () => {
        if (boo) {
            document.getElementById("pass" + props.id_c).type = "text";
            document.getElementById("eye" + props.id_c).className = "fa fa-eye";
            setBoo(false)

        } else {
            document.getElementById("pass" + props.id_c).type = "password";
            document.getElementById("eye" + props.id_c).className = "fa fa-eye-slash";
            setBoo(true)
        }
    }

    const toEditPass = () => {

        if (clicked) {
            document.getElementById("btn0" + props.id_c).hidden = true;
            document.getElementById("btn1" + props.id_c).hidden = false;
            document.getElementById("pass" + props.id_c).disabled = false;
            document.getElementById("user" + props.id_c).disabled = false;
            document.getElementById("web" + props.id_c).disabled = false;
            document.getElementById("title" + props.id_c).disabled = false;
           setClicked(false)
            console.log("Estado de clicked: " + clicked)
        }

    }

    const editPass = async (id_c) => {
        console.log("Estado de clicked : " + clicked)
        //Funcion de actualizar
        if (!clicked) {
            console.log("Problema en entrar")
            document.getElementById("btn0" + props.id_c).hidden = false;
            document.getElementById("btn1" + props.id_c).hidden = true;
            document.getElementById("pass" + props.id_c).disabled = true;
            document.getElementById("user" + props.id_c).disabled = true;
            document.getElementById("web" + props.id_c).disabled = true;
            document.getElementById("title" + props.id_c).disabled = true;
            setClicked(true)

            await Axios.put("https://whalefare.herokuapp.com/edit/" + id_c, {
                title_c: Title,
                user_c: User,
                pass_c: Password,
                website_c: Website
            });
            console.log("Problema en Axios")
        }
    }

    const deletePass = (id_c) => {
        console.log("Entrando a borrar")
        //Funcion de actualizar
        Axios.delete("https://whalefare.herokuapp.com/" + id_c)
    }

    return (
        <div className="col" >
            <div className="card">
                <h3 className="card-header bg-success text-white">{props.title_c}</h3>
                <div className="container">
                    <label>Titulo</label>
                    <div className="mb-3 input-group">
                        <input
                            name="Title"
                            id={"title" + props.id_c}
                            className="form-control"
                            disabled={true}
                            onChange={(event) => {setTitle(event.target.value)}}
                            defaultValue={props.title_c}
                        />
                    </div>
                    <label>Nombre de usuario</label>
                    <div className="mb-3 input-group">
                        <input
                            name="User"
                            id={"user" + props.id_c}
                            className="form-control"
                            disabled={true}
                            onChange={(event) => {setUser(event.target.value)}}
                            defaultValue={props.user_c}
                        />
                    </div>
                    <label>Contraseña</label>
                    <div className="mb-3 input-group">
                        <input
                            name="Password"
                            type="password"
                            id={"pass" + props.id_c}
                            className="form-control"
                            disabled={true}
                            onChange={(event) => {setPassword(event.target.value)}}
                            defaultValue={props.pass_c}
                        />
                        <span
                            onClick={() => {hidePass()}}
                            className="input-group-text">
                            <i id={"eye" + props.id_c}
                                className="fa fa-eye"
                                aria-hidden="true">
                            </i>
                        </span>
                    </div>
                    <label>Sitio web</label>
                    <div className="mb-3 input-group">
                        <input
                            name="Website"
                            id={"web" + props.id_c}
                            className="form-control"
                            disabled={true}
                            onChange={(event) => {setWebsite(event.target.value)}}
                            defaultValue={props.website_c}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className="btn btn-warning"
                            id={"btn0" + props.id_c}
                            hidden={false}
                            onClick={() => { toEditPass() }}>
                            <i className="fa fa-pen" />
                        </button>
                        <button
                            className="btn btn-warning"
                            id={"btn1" + props.id_c}
                            hidden={true}
                            onClick={() => { editPass(props.id_c) }}>
                            Guardar
                        </button>
                        <button
                            className="btn btn-danger"
                            id={"btn2" + props.id_c}
                            onClick={() => { deletePass(props.id_c) }}>
                            <i className="fa fa-trash" />
                        </button>
                        <br />
                        <a className="btn btn-primary" href={props.website_c}> <i className="fa fa-check" /></a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Password;