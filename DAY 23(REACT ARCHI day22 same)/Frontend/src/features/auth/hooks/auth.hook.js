import { useContext } from "react"
import { Authcontext } from "../auth.context"
import { login, register } from "../services/auth.api"




export const useAuth = ()=>{
    const {user,setuser,loading,setloading} = useContext(Authcontext)

    async function handlelogin(username,password){
       setloading(true) 
       try {
        const res = await login(username,password)

          setuser(res.user)
          return 'login from hook'
      

       } catch (error) {
        throw error
        
       }finally{
        setloading(false)
       }
   }

   async function handleregister(username,email,password){
    setloading(true)
    try {
        const res = await register(username,email,password)

        setuser(res.user)
      
    } catch (error) {
        throw error
    }finally{
        setloading(false)
    }
   }
  

   return({user,loading,handlelogin,handleregister})

}


