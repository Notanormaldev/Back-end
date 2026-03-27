import { useContext } from "react"
import { Followcontext } from "../Followcontext"
import { follow, followdets,  otheruserapi } from "../services/follow.api"




export const usefollow=()=>{
    const context = useContext(Followcontext)

    const {followers , following , setfollowing , setfollowers,users,setusers} = context


    async function handlefollow(){
         const res = await followdets()
        //  console.log(res);
         
         setfollowers(res.followers)
         setfollowing(res.following)
    }
    async function handelotheruser(){
        const res = await otheruserapi()
        setusers(res.otheruser)
    }

    async function followtheuser(userid){
           const res = await follow(userid)
           await handlefollow()
           await handelotheruser()
    }

    return(
        {followers,following,handlefollow,handelotheruser,users,followtheuser}
    )
}