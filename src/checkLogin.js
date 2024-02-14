import { useEffect, useState } from "react"
import supabase from "./config/supabaseClient"
import {useHistory} from 'react-router-dom';


export default function CheckSession({children}){
    const [session, setSession] = useState({})
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    
    useEffect(()=>{
        async function getSession(){
          const session = await supabase.auth.getSession()
          setSession(session.data);
          setLoading(false)
        }
        getSession()
      },[])

      if (loading){
        return <div style={{marginTop:"300px"}}>Loading...</div>;
      } else {
        if(session.session == {} || session.session == null){
            history.push("/login")
        }else{
            return children;
        }
      }
      
}

