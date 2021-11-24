import React from 'react';
import { NavLink } from 'react-router-dom';

function Politicas() {

    return (
        <div class="container">
            <h1 class="md-3 pt-5">AVISO DE PRIVACIDAD</h1>
            <br /><br />
            Tecnología Krishna, S. A. de C. V., con domicilio en Mar Mediterráneo 227, col. Popotla, C. P. 11420,
            alcaldía Miguel Hidalgo, Ciudad de México, es responsable de recabar sus datos personales, del uso que se le dé a
            los mismos y de su protección.
            <br /><br />
            Su información personal será utilizada para proveer los servicios y productos que ha solicitado, informarle sobre
            cambios en los mismos y evaluar la calidad del servicio que le brindamos. Para las finalidades antes mencionadas,
            requerimos obtener los siguientes datos personales: dirección de correo electrónico, contraseñas de servicios
            electrónicos, considerado como sensible según la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares, historial de sitios de Internet visitados y sesiones activas en sitios de Internet visitados.
            <br /><br />
            Usted tiene derecho de acceder, rectificar y cancelar sus datos personales, así como de oponerse al tratamiento de
            los mismos o revocar el consentimiento que para tal fin nos haya otorgado, a través de los procedimientos que hemos
            implementado. Para conocer dichos procedimientos, los requisitos y plazos, se puede poner en contacto con nuestro
            departamento de datos personales en Unidad de Informática del Centro de Estudios Científicos y Tecnológicos 9 Juan
            de Dios Bátiz, Mar Mediterráneo 227, col. Popotla, C. P. 11420, alcaldía Miguel Hidalgo, Ciudad de México, 5729 6000
            extensión 63825, mibanezm1900@alumno.ipn.mx o visitar nuestra página de Internet <a
                href="https://www.cecyt9.ipn.mx/" class="href">https://www.cecyt9.ipn.mx/</a>.
            <br /><br />
            Asimismo, le informamos que sus datos personales pueden ser transferidos y tratados dentro y fuera del país, por
            personas distintas a esta empresa. En ese sentido, su información puede ser compartida con profesores del área de
            Programación del Centro de Estudios Científicos y Tecnológicos 9 Juan de Dios Bátiz, coordinadores de proyectos de
            Proyecto Aula y desarrolladores del Centro de Estudios Científicos y Tecnológicos 9 Juan de Dios Bátiz, para
            realizar pruebas de seguridad y vulnerabilidad de datos sensibles del usuario y mejoras técnicas en la aplicación
            usada. Si usted no manifiesta su oposición para que sus datos personales sean transferidos, se entenderá que ha
            otorgado su consentimiento para ello.
            <br /><br />
            Si usted desea dejar de recibir mensajes promocionales de nuestra parte puede solicitarlo a través de 5729 6000
            extensión 63825, Mar Mediterráneo 227, col. Popotla, C. P. 11420, alcaldía Miguel Hidalgo, Ciudad de México,
            mibanezm1900@alumno.ipn.mx.
            <br /><br />
            Cualquier modificación a este aviso de privacidad podrá consultarla en  
            <a href="https://www.cecyt9.ipn.mx/" style={{ textDecoration: 'none', color: 'black' }}className="href">  https://www.cecyt9.ipn.mx/</a>.
            <br /><br />
            <p style={{ textAlign: 'right' }}>Fecha de última actualización: 31/8/2021.</p>
            <br /><br />
            <NavLink to="/" aria-current="page">
                <p>Volver</p>
            </NavLink>
            <a class="active" href="/">

            </a>
        </div >

    );

}

export default Politicas;