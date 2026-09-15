"use client"
import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";



let Auth = createContext()


let Authprovider = ({children})=>{
    const [user, setuser] = useState(null)
   let hydrateuser = async ()=>{
   try {
    let res = await api.get("/api/auth/me")
    console.log(res);
    setuser(res.data.user)
    
   } catch (error) {
    setuser(null)
    console.log(error)
    
   }
   }
   useEffect(()=>{
hydrateuser()
   },[])

    return <Auth.Provider value={{user, setuser}}>

        {children}

        </Auth.Provider>
}

let useAuth = ()=>{
 return   useContext(Auth)
}

export {useAuth , Authprovider}