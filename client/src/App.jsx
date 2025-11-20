import { Button } from "@/components/ui/button"
import { Children } from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import Auth from "./pages/Auth";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context";
import RequireAuth from "./components/RequireAuth";

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
        element: <RequireAuth><Dashboard/></RequireAuth>
      },
      {
        path: '/link/:id',
        element: <RequireAuth><Link/></RequireAuth>
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
  return <UrlProvider><RouterProvider router={router}/></UrlProvider>
}

export default App