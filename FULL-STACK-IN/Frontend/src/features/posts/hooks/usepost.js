import { useContext, useEffect } from "react"
import { postcontext } from "../post.context"
import { createfeed, getfeed, likepost, unlikepost } from "../services/post.api"

export const usepost =()=>{

    const context = useContext(postcontext)
    const {loading,feed,post,setloading,setfeed,setpost} = context

    async function handlefeed(){
        setloading(true)
        const res = await getfeed()
        setfeed(res.posts.reverse())
        setloading(false)
    }

    async function handlecreatepost(imagefile,caption){
        setloading(true)

        
        const res =await createfeed(imagefile,caption) 
       
        setfeed([res.post,...feed])
         
        setloading(false)
    }
    
   async function handlelikepost(postid){
       setloading(true)
    const res = await likepost(postid)
    await handlefeed()
    setloading(false)
   }
  

   async function handleunlikepost(postid){  
       setloading(true)
    const res = await unlikepost(postid)
   await handlefeed()
   setloading(false)
   
   }

    useEffect(()=>{
         handlefeed()
    },[])

    return({handlefeed,loading,feed,post,handlecreatepost,handlelikepost,handleunlikepost})

}