import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.route'
import '../src/features/Shared/Styles/global.scss'
import { AuthProvider } from './features/auth/auth.context'

function App() {
  return (
   <>
   <AuthProvider>
   <RouterProvider router={router}/>
   </AuthProvider>
   </>
  )
}

export default App
