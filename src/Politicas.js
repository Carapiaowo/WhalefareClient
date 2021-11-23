import React from 'react';
import { NavLink } from 'react-router-dom';

function Politicas() {

    return (
        <div className="container">
            <br />
            <h1 className='md-3 pt-5'>AVISO DE PRIVACIDAD</h1>
            <br />
            Tecnología Krishna, S. A. de C. V., con domicilio en Mar Mediterráneo 227, col. Popotla, C. P. 11420, alcaldía
            Miguel
            Hidalgo, Ciudad de México, es responsable de recabar sus datos personales, del uso que se le dé a los mismos y de su
            protección.
            <br />
            Su información personal será utilizada para proveer los servicios y productos que ha solicitado, informarle sobre
            cambios en los mismos y evaluar la calidad del servicio que le brindamos. Para las finalidades antes mencionadas,
            requerimos obtener los siguientes datos personales: dirección de correo electrónico, contraseñas de servicios
            electrónicos, considerado como sensible según la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares, historial de sitios de Internet visitados y sesiones activas en sitios de Internet visitados.
            <br />
            Usted tiene derecho de acceder, rectificar y cancelar sus datos personales, así como de oponerse al tratamiento de
            los
            mismos o revocar el consentimiento que para tal fin nos haya otorgado, a través de los procedimientos que hemos
            implementado. Para conocer dichos procedimientos, los requisitos y plazos, se puede poner en contacto con nuestro
            departamento de datos personales en Unidad de Informática del Centro de Estudios Científicos y Tecnológicos 9 Juan
            de
            Dios Bátiz, Mar Mediterráneo 227, col. Popotla, C. P. 11420, alcaldía Miguel Hidalgo, Ciudad de México, 5729 6000
            extensión 63825, mibanezm1900@alumno.ipn.mx o visitar nuestra página de Internet https://www.cecyt9.ipn.mx/.
            <br />

            <NavLink to="/">
                <p>Volver</p>
            </NavLink>
        </div>

    );

}

export default Politicas;