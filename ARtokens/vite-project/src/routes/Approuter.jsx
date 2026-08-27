import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router"
import Login from '../pages/Login'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Authlayouts from '../layouts/Authlayouts'
import Register from '../pages/Register'
function Approuter() {

  let router = createBrowserRouter([
     {
        path:"/",
        element:<Authlayouts/>,
        children:[
            {
              path:"",
              element:<Login/>  
            },
            {
                path:"/register",
                element:<Register/>
            }
        ]

     },{
       path:"/home",
       element:<MainLayout/>,
       children:[
          { path:"",
           element:<Home/>}
       ]
     }
  ])



  return <RouterProvider router={router}/>


}

export default Approuter