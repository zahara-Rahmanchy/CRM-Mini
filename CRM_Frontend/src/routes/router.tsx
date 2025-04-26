import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children:[
            {
                path:'/',element:<App/>
            },
            {
                path:"/register",element:<Register/>
            }
        ]
    }
])