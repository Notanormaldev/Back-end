import { createContext, useState, useEffect } from "react";
import { getme } from "./services/auth.api";

export const Authcontext = createContext()
export const Authprovider = ({children})=>{
    const [user, setuser] = useState('')
    const [loading, setloading] = useState(true)
        // console.log(user,loading);
        
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getme().then(res => {
                setuser(res.user);
            }).catch(() => {
                localStorage.removeItem("token");
            }).finally(() => {
                setloading(false);
            });
        } else {
            setloading(false);
        }
    }, []);

    return(
        <Authcontext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </Authcontext.Provider>
    )
}