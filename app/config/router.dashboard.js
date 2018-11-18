import React from 'react';
import { Switch, Route } from 'react-router-dom';


import ClasseList from '../containers/classe/ClasseList';
import Classe from '../containers/classe/Classe';

import IndexProf from '../containers/professeur/Index';
import IndexModule from '../containers/module/Index';
import Module from '../containers/module/Module';
import Seance from '../containers/seance/Seance';


import HomeTemp from '../containers/HomeTemp'




const routes = [
  {
    path: '/dash',
    icon: "user",
    name: "DashBoard",
    component: HomeTemp
  },

  {
    path: '/profs',
    icon: "user",
    name: "Professeur",
    component: IndexProf
  },

  // Classes router
  {
    path: '/classes/:id',
    // icon: "user",
    // name: "Etudiant",
    component: Classe
  },
  {
    path: '/classes',
    icon: "profile",
    name: "Classes",
    component: ClasseList
  },

  {
    path: '/modules/:id',
    component: Module
  },
  //Module Router
  {
    path: '/modules',
    icon: "profile",
    name: "Modules",
    component: IndexModule
  },

  {
    path: '/seances/:id',
    component: Seance
  },

  
];






export class Router extends React.Component {
  render() {
    return (
      <Switch>
        {
          routes.map(section => (
            <Route
                exact
                key={section.path}
                path={section.path}
                component={section.component}
              />
          ))
        }
      </Switch>
    );
  }
}

export default routes;
