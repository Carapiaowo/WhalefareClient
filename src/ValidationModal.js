import React from 'react'

function ValidationModal(props) {
    const type = props.modalValType;
    if (type === 'emptyform') {
        return (
            <div>
                Llena todos los campos
            </div>
        )
    } else if (type === 'title') {
        return (
            <div>
                Ingresa un título válido
            </div>
        )
    } else if (type === 'safepassword') {
        return (
            <div>
                Ingresa una contraseña más segura
            </div>
        )
    } else if (type === 'password') {
        return (
            <div>
                Ingresa una contraseña válida
            </div>
        )
    } else if (type === 'website') {
        return (
            <div>
                Ingresa un sitio web válido
            </div>
        )
    } else if (type === 'user') {
        return (
            <div>
                Ingresa un usuario válido
            </div>
        )
    } else if (type === 'email') {
        return (
            <div>
                Ingresa un correo válido
            </div>
        )
    } else if (type === 'unverified') {
        return (
            <div>
                Por favor verifica tu cuenta
            </div>
        )
    } else if (type === true) {
        return (
            <div>

            </div>
        )
    } else if (type === 'wrong') {
        return (
            <div>
                Revisa que tu cuenta esté verificada
            </div>
        )
    } else if (type === 'success') {
        return (
            <div>

            </div>
        )
    } else {
        <div>
            Revisa que los datos ingresados sean correctos
        </div>
    }
}

export default ValidationModal