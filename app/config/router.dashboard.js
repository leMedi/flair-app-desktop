import path from 'path';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HelloPage from '../containers/HelloPage';
import ProfilePage from '../containers/ProfilePage';

import ProfList from '../containers/professeur/ProfList';
import AjouterProf from '../containers/professeur/AjouterProf';

import AjouterClasse from '../containers/classe/AjouterClasse';
import ClasseList from '../containers/classe/ClasseList';

import AjouterModule from '../containers/module/AjouterModule';
import ModuleList from '../containers/module/ModuleList';

import Index from '../containers/professeur/Index';





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
        path: '/',
        name: "Professeur",
        icon: "profile",
        component: Index
      },
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
      { 
        path: '/ajouterClasse',
        name: "ajouterClasse",
        icon: "user-add",
        component: AjouterClasse
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
        name: "ModuleList",
        icon: "profile",
        component: ModuleList
      },
      { 
        path: '/ajouterModule',
        name: "ajouterModule",
        icon: "user-add",
        component: AjouterModule
      },
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
