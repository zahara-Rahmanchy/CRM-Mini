import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Register from "../pages/Register";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/AuthenticatedPages/Dashboard"
import Clients from "../pages/AuthenticatedPages/Clients"
import Projects from "../pages/AuthenticatedPages/Projects"
import InteractionLogs from "../pages/AuthenticatedPages/InteractionLogs"
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRoute";
import AddProject from "../pages/AuthenticatedPages/AddProject";
export const router = createBrowserRouter([
    {
        element: <Home/>,
        children:[
            {
                path:'/',element:<Login/>
            },
            {
                path:"/Register",element:<Register/>
            }
        ]
    },
    {
        element:<ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>,
        children:[
            {
                path:"/Dashboard", element:<Dashboard/>
            },
            {
                path:"/Clients", element:<Clients/>
            },
            {
                path:"/Projects", element:<Projects/>
            },
            { 
                path:"/add-project" ,element:<AddProject/> 
            },

            {
                path:"/InteractionLogs", element:<InteractionLogs/>
            }

        ]
    }
])