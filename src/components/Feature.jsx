import React from 'react';
import FeatureBox from './FeatureBox';
import featureimage from '../images/feature_1.png';
import featureimage1 from '../images/feature_2.png';
import featureimage2 from '../images/feature_3.png';

function Feature() {
    return (
        <div id='features'>
            <h2>Whalefare prioriza tu seguridad</h2>
            <p>Nos comprometemos a cuidar tus contraseñas</p>
            <div className='a-container'>

                <FeatureBox image={featureimage} title='Gráficos' name='A través de un sistema comprensible, sabrás cuán seguras son tus contraseñas.' />
                <FeatureBox image={featureimage1} title='Cifrado' name='Gracias al uso de cifrado, tus datos se encuentran seguros en la aplicación.' />
                <FeatureBox image={featureimage2} title='Facilidad' name='Con una interfaz fácil de usar, podrás gestionar tus datos sensibles.' />
            </div>
            <div>

            </div>
        </div>

    )
}

export default Feature;