import { Children, useState } from "react";
const { createContext } = require("react");


const Authcontext = createContext()


export const AuthProvider = ({children})=>{
    const [loading, setloading] = useState(false)
    const [user, setuser] = useState(null)

   return(
    <Authcontext.Provider value={{loading,setloading,user,setuser}}>
        {children}
    </Authcontext.Provider>
   )
}