import React from "react";
import { Link } from "react-router-dom";


export default function LogoHeader () {

return (
<div className="d-flex justify-content-between align-items-center bg-black p-2">
<img src="./src/assets/images/podcast.png"  width={"80px"} height={"80px"}/>

<Link to={"/login"}>
<button>Sign Out</button>
</Link>
 <div>


</div>
</div>


)

    
}