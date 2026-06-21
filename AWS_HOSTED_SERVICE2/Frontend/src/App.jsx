import React, { useState, useEffect } from 'react'

function App() {
  const [user, setuser] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setuser(data))
  }, [])

  return (
    <>
      {user.map((item, key) => (
        <div key={key}>{item.name}</div>
      ))}
    </>
  )
}

export default App