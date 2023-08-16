import React from "react";
import { Link } from "react-router-dom";


export default function SignOutNav () {
    return (
        <>
         <Link to={"/login"}>
<button className="btn btn-primary btn-sm fs-7 ">Sign Out</button>
</Link>

        
        </>
    )
}