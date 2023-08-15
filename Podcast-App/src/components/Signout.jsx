import React from "react";
import { Link } from "react-router-dom";
import {createClient} from "@supabase/supabase-js"
import {Auth} from "@supabase/auth-ui-react"
import { ThemeSupa} from "@supabase/auth-ui-shared"
import { useNavigate } from "react-router-dom"


const supabase = createClient(
    "https://sgcuecxeqiqzznshceyy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnY3VlY3hlcWlxenpuc2hjZXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5OTcyODAsImV4cCI6MjAwNzU3MzI4MH0.PIegs_9jF51LqZk6JRXfR32iwWCB4vr0-z3H8WRhq9k"
  );

export default function SignOut (){

    const [user, setUser] = React.useState({})
    const navigate = useNavigate()
   
   
    React.useEffect(()=> {
     async function getUserData() {
       await supabase.auth.getUser().then((value)=>{
         if (value.data?.user){
           console.log(value.data.user)
           setUser(value.data.user)
         }
       })
     }
     getUserData();
    }, [])
   
    async function signOutUser () {
     const { error }= await supabase.auth.signOut();
     navigate("/login")
    }
   
    
    return (
      
        <div className= "App">
                
           {Object.keys(user).length!==0 ?
               
               
               
               <>
            <button type="button" className="btn btn-outline-light"onClick={()=> signOutUser()}>SignOut</button>
                </>
              :
              <>
              
              <h1>User not logged in</h1>
              <button type="button" className="btn btn-outline-light" onClick={()=>{navigate("/login")}}>Go back Home</button>
              </>
           }
        </div>
        )


}