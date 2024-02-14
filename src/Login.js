import { createClient } from "@supabase/supabase-js";
import Button from "./Home Page Components/Button";
import supabase from "./config/supabaseClient";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {ReactComponent as GoogleIcon} from "./assets/googleicon.svg"
import "./Login.css";


export default function Login(){
    const [error, setError] = useState([])

    useEffect(() => {
        if (error === null){
            Redirect("/")
        }
    }, [])

    const handleButtonClick = async () => {
        const {data, error} = await loginWithGoogle()
        setError(error)
    }

    
    const loginWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
        return {data, error}
      };

      return(
        <div className = "login-background">
        <div className="login-container" >
            <div className="login-logo">Flip<span>Learn</span></div>
            <div className="login-description">Click to Sign in or Create an account</div>
            <div className={"google-login-btn"} onClick={handleButtonClick}>Continue with Google <GoogleIcon height="20px" width="20px"/></div>
        </div>
        </div>
      )
      
}
