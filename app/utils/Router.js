import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated() === true
      ? <component {...props} />
      : <Redirect to={{
          pathname: auth.loginPage,
          state: { from: props.location }
        }} />
  )} />
)

PrivateRoute.propTypes = {
  component: Component,
  auth: Object
}

PrivateRoute.defaultProps = {
  component: (<h3>Component Not Found</h3>),
  auth: {
    isAuthenticated: () => false
  }
}


export default function routerMaker(routes) {
  return () => (
    <Switch>
      {
        routes.map(route => {
          if(route.auth)
            return (
              <PrivateRoute
                exact={route.exact === true}
                key={route.path}
                path={route.path}
                component={route.component}
                auth={route.auth}
              />
            )
          
          return (
              <Route
                exact={route.exact === true}
                key={route.path}
                path={route.path}
                component={route.component}
              />
          )
        })
      }
    </Switch>
  );
}
routerMaker.propTypes = {
  routes: Array,
}

routerMaker.defaultProps = {
  routes: [],
}



