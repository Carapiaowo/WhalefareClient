import React from 'react';
import Image from 'react-bootstrap/Image'
import FeatureBox from './FeatureBox';
import featureimage from '../images/feature_1.svg';
import featureimage1 from '../images/feature_2.svg';
import featureimage2 from '../images/feature_3.svg';
import duo from '../images/duo.png';
import f_x_c from '../images/f_x_c.png';
import { Col, Container, Form, Button, Card } from "react-bootstrap";

function Feature() {
    return (
        <div>
            <div id='features'>
            <h2>Sincronización en todos tus dispositivos</h2>
            <div className='a-container'>
            <Image src={duo} className='imgini' alt='...' />
            </div>
        </div>
        <div id='features'>
            <h2>Extensión en tu navegador favorito</h2>
            <div className='a-container'>
            <Image src={f_x_c} style={{width: 350, height: 350}} alt='...' />
            </div>
        </div>
        <div id='features2'>
            
            <h2>¿Qué es Whalefare?</h2>
            <p>Lo que hacemos y por qué lo hacemos</p>
            <div className='parrafoini' >
              <p >En la actualidad la vida de la mayoría de personas converge con los servicios digitales
                  ofrecidos por un gran número de compañías tecnológicas. Estos servicios son personalizables,
                  pues permiten al usuario expresar su personalidad en estos servicios para establecer una conexión y destacar su 
                  individualidad, razón por la cual existen las cuentas. Las contraseñas necesitan garantizar la seguridad de sus respectivas cuentas.

              </p>
              
            </div>
        </div>
        <div id='features3'>
            
            <h2>Whalefare prioriza tu seguridad</h2>
            <p>Descubre cómo protegemos tus contraseñas</p>

            <div className='iconosf3'>
                <FeatureBox image={featureimage} title='Gráficos' name='A través de un sistema comprensible, sabrás cuán seguras son tus contraseñas.' />
                <FeatureBox image={featureimage1} title='Cifrado' name='Gracias al uso de cifrado, tus datos se encuentran seguros en la aplicación.' />
                <FeatureBox image={featureimage2} title='Facilidad' name='Con una interfaz fácil de usar, podrás gestionar tus datos sensibles.' />
            </div>
        </div>
        </div>

    )
}

export default Feature;