import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import '../src/features/shared/global.scss'
import { Authprovider } from './features/auth/auth.context.jsx'
function App() {
  return (
    <Authprovider>
      <RouterProvider router={router}/>
    </Authprovider>
  )
}

export default App
