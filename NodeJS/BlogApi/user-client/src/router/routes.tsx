import type { RouteObject } from 'react-router'; 
import App from '../App';
import Post from '../pages/Post';
import Homepage from '../pages/Homepage';
import NotFound from '../pages/NotFound';
import Auth from '../pages/Auth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App/>,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'auth', element: <Auth /> },
      { path: 'posts/:id', element: <Post /> },
      { path: '*', element: <NotFound /> }
    ],
  },
];

export default routes;