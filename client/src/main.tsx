import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App         from './App';
import Welcome     from './pages/Welcome';
import SignUp      from './pages/SignUp';
import Login       from './pages/Login';
import SkillSelect from './pages/SkillSelect';
import Beginner    from './pages/Beginner';
import Intermediate from './pages/Intermediate';
import Advanced    from './pages/Advanced';
import Stats       from './pages/Stats';
import NotFound    from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound/>,
    children: [
      { index: true,          element: <Welcome/>    },
      { path: 'signup',       element: <SignUp/>     },
      { path: 'login',        element: <Login/>      },
      { path: 'select',       element: <SkillSelect/>},
      { path: 'beginner',     element: <Beginner/>   },
      { path: 'intermediate', element: <Intermediate/> },
      { path: 'advanced',     element: <Advanced/>   },
      { path: 'stats',        element: <Stats/>      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
);
