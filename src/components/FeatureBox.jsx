import React from 'react';
import {Card } from "react-bootstrap";


function FeatureBox(props) {
    return (

       <>
       <Card className='containerazul'>
           <Card.Body>
           <div >
            <div class="row">
                <div class="col"></div>
               
                <div class="w-10"></div>
    <div class="col"> <h2>{props.title}</h2><p>{props.name}</p></div>
    <div class="col"> <img className='a-b-img' src={props.image} alt="Imagen de algo" style={{color: 'white'}}/></div>
            </div>
            </div>
           </Card.Body>
       </Card>

        </>
    )
}

export default FeatureBox;