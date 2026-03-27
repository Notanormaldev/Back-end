import { createContext, useState } from "react";


export const postcontext = createContext()


export const Postprovider = ({children})=>{
    const [loading, setloading] = useState('')
    const [feed, setfeed] = useState('')
    const [post, setpost] = useState('')


    return(
        <postcontext.Provider value={{loading,post,feed,setloading,setfeed,setpost}}>
            {children}
        </postcontext.Provider>

    )

}