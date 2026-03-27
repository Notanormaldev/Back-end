import { createContext, useState } from "react";


export  const Followcontext = createContext()


export const Followprovider = ({children})=>{
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])
const [users, setusers] = useState([])

  return(
        <Followcontext.Provider value={{followers,following,setfollowers,setfollowing,users,setusers}}>
            {children}
        </Followcontext.Provider>
  )

    

}


