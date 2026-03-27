import { createContext, useState } from "react";

export const Authcontext = createContext()
export const Authprovider = ({children})=>{
    const [user, setuser] = useState('')
    const [loading, setloading] = useState(false)
        // console.log(user,loading);
        

    return(
        <Authcontext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </Authcontext.Provider>
    )
}