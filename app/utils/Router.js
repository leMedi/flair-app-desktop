import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: auth.loginPage,
          state: { from: props.location }
        }} />
  )} />
)


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


