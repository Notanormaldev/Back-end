"use client"
import { useAuth } from "@/context/aurhcontext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"




const Protected = ({children})=>{
     
   let router = useRouter()
   let user= useAuth()

  useEffect(()=>{
    if(!user){
        router.replace('/login')
    }
  },[user,router])

    return children
}


export default Protected