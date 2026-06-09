import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'

function App() {
  const [user, setuser] = useState([])
  useEffect(() => {
    axios.get('/api/users').then((res) => {
      setuser(res.data)
    })
  }, [])
  return (
    <div>
      <h1>Users</h1>
      {user.map((u) => (
        <div key={u.id}>
          <p>{u.name}</p>
        </div>
      ))}
    </div>
  )
}

export default App
