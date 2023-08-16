import React from "react";
import { Link } from "react-router-dom";


export default function LogoHeader () {

return (
<div className="container-fluid d-flex justify-content-between align-items-center bg-black p-2">


<img src="./src/assets/images/logo.png"  width={"100px"} height={"100px"}/>


 <div>
 <Link to={"/login"}>
<button className="btn btn-primary btn-sm fs-7" >Sign Out</button>
</Link>

</div>
</div>


)

    
}