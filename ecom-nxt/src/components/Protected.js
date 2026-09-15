const { useAuth } = require("@/context/aurhcontext")
const { useRouter } = require("next/navigation")
const { useEffect } = require("react")




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