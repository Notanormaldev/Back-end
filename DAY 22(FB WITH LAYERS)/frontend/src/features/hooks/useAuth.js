import { useContext } from "react";
import { Authcontext } from "../auth.context.jsx";



export function useAuth(){
   const context = useContext(Authcontext)
   return context
}