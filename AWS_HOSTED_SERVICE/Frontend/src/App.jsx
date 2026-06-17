import React from 'react'

import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
function App() {
    
  const [users, setUsers] =useState([])

  useEffect(()=>{
    axios.get('/api/users')
    .then(response => {
      setUsers(response.data)
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
  },[])
   

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App


