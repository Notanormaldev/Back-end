import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const Authcontext =createContext()

export  function Authprovider({children}){
  const [user, setuser] = useState(null)
  const [isloading, setisloading] = useState(false)

 async function handleregister(username,email,password){
    setisloading(true)
    try {
         const res = await register(username,email,password)
         setuser(res.user)
         return 'register sucess'
        
    } catch (error) {
        console.log(error);
        
    }finally{
        setisloading(false)
    }
 }

 async function handlelogin(username,password){
    setisloading(true)
    try {
       const res = await login(username,password)
       setuser(res.data) 
       return 'login sucess'
    } catch (error){
     console.log(error);
    }finally{
        setisloading(false)
    }
 }

 return(
    <Authcontext.Provider value={{user,isloading,handlelogin,handleregister}}>
        {children}
    </Authcontext.Provider>
 )
}

