import { children, useState } from "react";
import { createContext } from "react";



export  const Authcontext = createContext()


export const AuthProvider = ({children})=>{
    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)

   return(
    <Authcontext.Provider value={{loading,setloading,user,setuser}}>
        {children}
    </Authcontext.Provider>
   )
}