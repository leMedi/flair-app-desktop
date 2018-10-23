import path from 'path';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HelloPage from '../containers/HelloPage';
import ProfilePage from '../containers/ProfilePage';
import ProfList from '../containers/professeur/ProfList';
import AjouterProf from '../containers/professeur/AjouterProf';



const routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    icon: "dashboard",
    name: "Dashboard",
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // dashboard
      { 
        path: '/hh',
        name: "Test",
        icon: "dashboard",
        component: HelloPage
      },
      { 
        path: '/profile',
        name: "Profile",
        icon: "dashboard",
        component: ProfilePage
      }
    ],
  },
  {
    path: '/Professeur',
    component: '../layouts/BasicLayout',
    icon: "user",
    name: "Professeur",
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // professeur
      { 
        path: '/profList',
        name: "ProfList",
        icon: "profile",
        component: ProfList
      },
      { 
        path: '/ajouterProf',
        name: "ajouterProf",
        icon: "user-add",
        component: AjouterProf
      },
    ],
  }
];






export class Router extends React.Component {
  render() {
    console.log(path.join(__dirname, './containers/HelloPage'))
    return (
      <Switch>
        {
          routes.map(section => (
            section.routes.map(route => (
              <Route
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))  
          ))}
        }
      </Switch>
    );
  }
}

export default routes;
