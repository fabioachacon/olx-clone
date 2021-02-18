import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';

const RouterHandler = ({ children, ...rest }) => {

    const logged = isLogged();
    const authorized = (rest.private && !logged) ? false : true;


    return (
        <div>
          <Route
           {...rest}
           render={() =>
             authorized ? children : <Redirect to='/signin'/>
           }
           />  
        </div>
    )
}

export default RouterHandler;
