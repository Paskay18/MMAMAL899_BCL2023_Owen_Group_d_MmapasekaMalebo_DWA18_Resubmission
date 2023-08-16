import React from "react";
import { Link } from "react-router-dom";


export default function LogoHeader () {

return (
<div className="container-fluid d-flex justify-content-between align-items-center bg-black p-2">


<img className="p-2" src="https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449550.jpg?size=626&ext=jpg&uid=R113066380&ga=GA1.2.1840262101.1689596857&semt=ais"  width={"100px"} height={"100px"}/>


 <div>
 <Link to={"/login"}>
<button className="btn btn-primary btn-sm fs-7 p-1" >Sign Out</button>
</Link>

</div>
</div>


)

    
}