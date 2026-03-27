import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import '../src/features/shared/global.scss'
import { Authprovider } from './features/auth/auth.context.jsx'
import { Postprovider } from './features/posts/post.context.jsx'
import { Followprovider } from './features/follow/Followcontext.jsx'

function App() {
  return (
    <Authprovider>
     <Postprovider>
      <Followprovider>
    <RouterProvider router={router}/>
      </Followprovider>
     </Postprovider> 
    </Authprovider>
  )
}

export default App
