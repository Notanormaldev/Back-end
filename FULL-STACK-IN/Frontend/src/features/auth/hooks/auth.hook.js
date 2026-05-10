import { useContext } from "react"
import { Authcontext } from "../auth.context"
import { login, register } from "../services/auth.api"


export const useAuth=()=>{
    const context = useContext(Authcontext)

    const {user,setuser,loading,setloading} = context

    async function handleregister(username,email,password){
        setloading(true)
        try {
            const res = await register(username,email,password)
            setuser(res.user)
            localStorage.setItem("token", res.token)

          return 'register'
        } catch (error) {
            throw error
        }finally{
            setloading(false)
        }
          
    }

    async function handlelogin(username,password) {
        setloading(true)
        try {
            const res = await login(username,password)
            setuser(res.user)
            localStorage.setItem("token", res.token)

            return "login"
        } catch (error) {
            throw error
        }finally{
            setloading(false)
        }
        
    }

    function handlelogout(){
        setuser(null)
        localStorage.removeItem("token")
    }

    return(
        {user,loading,handleregister,handlelogin,handlelogout}
    )
}