import {useEffect } from 'react'
import { axiosinsta } from './config/axiosinsta.jsx';


function App() {
  let getdata=async ()=>{
      try {
        let res = await axiosinsta.get('/products')
        console.log('this is ui app response-->',res);
      } catch (error) {
        console.log(error);
      }
}


useEffect(()=>{
    getdata()
},[])
  return (
    <div>App</div>
  )
}

export default App