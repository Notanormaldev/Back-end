import { createBrowserRouter,Navigate  } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import Createpost from "./features/posts/pages/Createpost";
const isLoggedIn = localStorage.getItem("token")


export const router = createBrowserRouter([
    {
        path:'/login',
         element: <Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
         element:  <Feed/>
    },{
        path:'/createpost',
        element:<Createpost/>
    }
])