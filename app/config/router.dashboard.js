import path from 'path';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HelloPage from '../containers/HelloPage';
import ProfilePage from '../containers/ProfilePage';


import ClasseList from '../containers/classe/ClasseList';

import IndexProf from '../containers/professeur/Index';
import IndexModule from '../containers/module/Index';
import IndexEtudiant from '../containers/etudiant/Index';





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
        path: '/Professeur',
        name: "Professeur",
        icon: "profile",
        component: IndexProf
      }
    ],
  },
  {
    path: '/Etudiant',
    component: '../layouts/BasicLayout',
    icon: "user",
    name: "Etudiant",
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // Etudiant
      { 
        path: '/Etudiant',
        name: "Etudiant",
        icon: "profile",
        component: IndexEtudiant
      }
    ],
  },
  {
    path: '/Classe',
    component: '../layouts/BasicLayout',
    icon: "user",
    name: "Classe",
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // classe
      { 
        path: '/classList',
        name: "ClassList",
        icon: "profile",
        component: ClasseList
      },
    ],
  },
  {
    path: '/Module',
    component: '../layouts/BasicLayout',
    icon: "user",
    name: "Module",
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // Module
      { 
        path: '/moduleList',
        name: "Module",
        icon: "profile",
        component: IndexModule
      }

    ],
  },
];






export class Router extends React.Component {
  render() {
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
