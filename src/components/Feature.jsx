import React from 'react';
import Image from 'react-bootstrap/Image'
import FeatureBox from './FeatureBox';
import featureimage from '../images/feature_1.svg';
import featureimage1 from '../images/feature_2.svg';
import featureimage2 from '../images/feature_3.svg';
import duo from '../images/duo.png';
import edge from '../images/edge_logo.png';
import opera from '../images/opera_logo.png';
import chromium from '../images/chromium_logo.png';
import brave from '../images/brave_logo.png';
import chromebag from '../images/chrome_bag.PNG';
import android from '../images/android_bug.png';

import { Col, Container, Form, Button, Card, CardGroup } from "react-bootstrap";

function Feature() {
    return (
        <div>
            <div id='features'>
            <h2>Sincronización en todos tus dispositivos</h2>
            <div className='a-container'>
            <Image src={duo} className='imgini' alt='...' />
            </div>
        </div>
        <div id='features1'>
            <h2>Extensión en tu navegador favorito</h2>
            <div className='a-container'>
            <Image className='navegadores' src={chromium}  alt='...' />
            <Image className='navegadores' src={opera}  alt='...' />
            <Image className='navegadores' src={edge}  alt='...' />
            <Image className='navegadores' src={brave}  alt='...' />
            </div>
        </div>
        <div id="features2"><h2>Qué es Whalefare</h2><p>Lo que hacemos y por qué lo hacemos</p><div class="parrafoini"><p>En la actualidad, la vida de la población converge con los servicios digitales existentes en un amplio número de rubros: desde la escritura de un dato hasta la realización de operaciones financieras. Sin embargo, conforme estos elementos aumentan, el cuidado y la atención prestados disminuyen.</p>
        <p>Whalefare es un gestor de datos que permite guardar y administrar notas, tarjetas de crédito y contraseñas, así como generar estas últimas, utilizando protocolos de seguridad para encriptar la información en una base de datos.</p></div></div>
        <div id='features3'>
            
            <h2>Whalefare prioriza tu seguridad</h2>
            <p>Descubre cómo protegemos tus contraseñas</p>

            <div className='iconosf3'>
                <FeatureBox image={featureimage} title='Accesibilidad' name='Mediante el almacenamiento en la nube, podrás acceder a tus datos desde cualquier dispositivo.' />
                <FeatureBox image={featureimage1} title='Cifrado' name='Gracias al uso de cifrado, tus datos se encuentran seguros en la aplicación.' />
                <FeatureBox image={featureimage2} title='Facilidad' name='Con una interfaz fácil de usar, podrás gestionar tus datos sensibles.' />
            </div>
        </div>
        <div id='features4'>
        <h2>Descargas</h2>

            
        <CardGroup className='descargas'>
            <Card style={{backgroundColor:'transparent', borderColor:'transparent', boxShadow:'none'}}>
                
                <Card.Body>
                <Card.Title style={{textAlign:'center', color:'#404040'}} >Aplicación para dispositivos Android</Card.Title>
                </Card.Body>
             <a className='downa' href='https://drive.google.com/uc?export=download&id=1Y0KVI3eyLDeWwxmH7jARI8sVrza41Dl4'>
         <Card.Img variant="bottom" className='downicons' src={android} /></a>
            </Card>
            <Card style={{backgroundColor:'transparent', borderColor:'transparent', boxShadow:'none'}}>
                <Card.Body >
                <Card.Title style={{textAlign:'center', color:'#404040'}}>Extensión para navegadores Chromium</Card.Title>
                </Card.Body>
                 <a className='downa' href='https://drive.google.com/uc?export=download&id=1d4l4BLE3IoCfLPArFgCAStKXpe7pQj2T'>
        <Card.Img variant="bottom" className='downicons' src={chromebag} /></a>
            </Card>
            
            </CardGroup>
        </div>
        </div>

    )
}

export default Feature;
