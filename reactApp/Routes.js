import Root from './Components/Root.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import Directory from './Components/Directory.js';


const Routes = {
  // base component (wrapper for the whole application).
  component: Root,
  childRoutes: [

    {
      path: '/',
      component: Login,
    },

    {
      path: '/register',
      component: Register,
    },

    {
      path: '/directory',
      component: Directory,
    },
  ]
};

export default Routes;
