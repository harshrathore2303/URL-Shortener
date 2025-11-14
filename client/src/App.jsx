import { Button } from "@/components/ui/button"
import { Children } from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import Auth from "./pages/Auth";
import RedirectLink from "./pages/RedirectLink";

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/link/:id',
        element: <Link/>
      },
      {
        path: '/auth',
        element: <Auth/>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App