import { useContext } from "react"
import { Authcontext } from "../auth.context"
import { getme, login, register ,logout } from "../services/api.auth"
import { useEffect } from "react"




export const authhook=()=>{
   
    const {user,setuser,loading,setloading} =useContext(Authcontext)

   async function handlelogin({email,username,password}){
    try {
        setloading(true)
        const data = await login({email,username,password})
        setuser(data.user)
        setloading(false)
    } catch (error) {
        console.log(error);
        
    }
   }
   async function  handleregister({email,username,password}) {
       try {
        setloading(true)
        const data = await register({email,username,password})
        setuser(data.res)
        setloading(false)
       } catch (error) {
        console.log(error);
        
       }
   }
   async function handlegetme(){
   try {
        setloading(true)
        const data=await getme()
        setuser(data.user)
        setloading(false)
        } catch (error) {
            setloading(false)
        }
   }
   async function handlelogout(){
    setloading(true)
    const data= await logout()
    setuser(null)
    setloading(false)
   }
  

   useEffect(()=>{
        handlegetme()
   },[])

   return(
    {handlegetme,handlelogin,handleregister,handlelogout,user,loading}
   )
}