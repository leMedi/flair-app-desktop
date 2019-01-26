import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth, adminOnly, ...rest }) => (
  <Route {...rest} render={(props) => {
    if(auth.isAuthenticated()) {
      if(adminOnly && !auth.isAdmin())
        return (
          <Redirect to={{
            pathname: auth.homePage,
            state: { from: props.location }
          }} />
        )  
      
      return <Component {...props} />
    }
    return ( 
      <Redirect to={{
        pathname: auth.loginPage,
        state: { from: props.location }
      }} />
    )
  }} />
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
                adminOnly={route.adminOnly}
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


