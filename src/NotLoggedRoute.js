import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function NotLoggedRoute({ isAuth, Component, ...rest }) {
    console.log(isAuth)
    return (
        <Route {...rest}
            render={(props) => {
                if (isAuth !== false) {
                    console.log('Diferente de false')
                    return (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )

                } else {

                    return <Component />
                }
            }} />
    )
}

export default NotLoggedRoute;