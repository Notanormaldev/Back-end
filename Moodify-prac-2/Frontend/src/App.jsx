import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.route'
import '../src/features/Shared/Styles/global.scss'

function App() {
  return (
   <>
   <RouterProvider router={router}/>
   </>
  )
}

export default App
