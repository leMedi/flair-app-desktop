import routerMaker from '../utils/Router'
import Session from '../utils/Session'

import ClasseList from '../containers/classe/ClasseList';
import Classe from '../containers/classe/Classe';

import IndexProf from '../containers/professeur/Index';
import IndexModule from '../containers/module/Index';
import Module from '../containers/module/Module';
import Seance from '../containers/seance/Seance';


import HomePage from '../containers/HomePage'

const auth = {
  isAuthenticated: () => Session.get(Session.keys.AUTH)._id,
  loginPage: '/user/login',
  isAdmin: () => {
    console.log("is admin", Session.get(Session.keys.AUTH).type)
    return Session.get(Session.keys.AUTH).role === 'admin'
  },
  homePage:  '/',
}

// auth = null

const routes = [
  {
    path: '/dashbaord',
    icon: "user",
    name: "DashBoard",
    component: HomePage,
  },

  {
    path: '/profs',
    icon: "user",
    name: "Professeur",
    component: IndexProf,
    auth,
    adminOnly: true
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
    adminOnly: true
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
    adminOnly: true
  },

  {
    path: '/seances/:id',
    component: Seance,
    auth,
  },


  // default route
  {
    path: '/',
    component: HomePage,
  },
];


export const Router = routerMaker(routes);
export default routes;
