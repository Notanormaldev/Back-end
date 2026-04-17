import React from 'react'
import AppRoutes from './AppRoutes'
import '../src/style.scss'
import { Authprovider } from './features/auth.context.jsx'
function App() {
  return (
    <div>
      <Authprovider>
      <AppRoutes/>
      </Authprovider>
    </div>
  )
}

export default App
