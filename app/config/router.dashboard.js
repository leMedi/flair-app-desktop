import routerMaker from '../utils/Router'
import Session from '../utils/Session'

import ClasseList from '../containers/classe/ClasseList';
import Classe from '../containers/classe/Classe';

import IndexProf from '../containers/professeur/Index';
import IndexModule from '../containers/module/Index';
import Module from '../containers/module/Module';
import Seance from '../containers/seance/Seance';


import HomeTemp from '../containers/HomeTemp'

const auth = {
  isAuthenticated: ()=>(Session.get(Session.keys.AUTH) !== null),
  loginPage: '/user/login'
} 

// auth = null

const routes = [
  {
    path: '/dashbaord',
    icon: "user",
    name: "DashBoard",
    component: HomeTemp,
  },

  {
    path: '/profs',
    icon: "user",
    name: "Professeur",
    component: IndexProf,
    auth,
  },

  // Classes router
  {
    path: '/classes/:id',
    component: Classe,
    auth,
  },
  {
    path: '/classes',
    icon: "profile",
    name: "Classes",
    component: ClasseList,
    auth,
  },

  {
    path: '/modules/:id',
    component: Module,
    auth,
  },

  // Module Router
  {
    path: '/modules',
    icon: "profile",
    name: "Modules",
    component: IndexModule,
    auth,
  },

  {
    path: '/seances/:id',
    component: Seance,
    auth,
  },


  // default route
  {
    path: '/',
    component: HomeTemp,
  },
];


export const Router = routerMaker(routes);
export default routes;
