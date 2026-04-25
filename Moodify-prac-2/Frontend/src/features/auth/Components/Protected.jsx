import React from 'react'
import { authhook } from '../hooks/authhook'
import { Navigate } from 'react-router-dom'

function Protected({children}) {
    const {user,loading} = authhook() 
    if(loading){
        return <h1>Loading...</h1>
    }
    if(!user){
        return <Navigate to='/login'/>
    }
    return children

}

export default Protected
