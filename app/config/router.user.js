import routerMaker from '../utils/Router'

import LoginPage from '../containers/Login/LoginPage';

const routes = [
  {
    path: '/user',
    icon: "user",
    name: "DashBoard",
    component: LoginPage
  },
];

export const Router = routerMaker(routes);
export default routes;
