import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { withRouter } from 'react-router-dom';

function Sign() {
    const [signType, setSignType] = useState('Log In');
    const signTypeSet = () => {
        if (signType === 'Sign Up') {
            setSignType('Log In')
        } else {
            setSignType('Sign Up')
        }
    }

    return (
        <div>
            {
                signType === 'Log In' ?
                    <div>
                        <button className="btn btn-success active" onClick={signTypeSet}>{'Registrarme'}</button>
                        <button className="btn btn-info disabled">{'Iniciar sesión'}</button>
                        <Login />
                    </div>
                    :
                    <div>
                        <button className="btn btn-success active" onClick={signTypeSet}>{'Iniciar sesión'}</button>
                        <button className="btn btn-info disabled">{'Registrarme'}</button>
                        <Signup />
                    </div>
            }
        </div>
    )
}

export default withRouter(Sign);