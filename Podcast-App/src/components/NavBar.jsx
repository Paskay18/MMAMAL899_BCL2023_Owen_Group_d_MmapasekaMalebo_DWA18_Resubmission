import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ 
  sortShowsAZ={sortShowsAZ},
  showSortOrder,
  resetShowData,
  sortLatestOldest,
  sortDateOrder

}) {
  return (
    <div className="navBar container-fluid d-flex justify-content-evenly p-1 ">
    <div>
 <Link to="/genreSearchSort">
        <button className="btn btn-primary btn-sm p-1">Genres</button>
      </Link>
      </div>
      
      <div>
      <button className="btn btn-primary btn-sm"  onClick={sortShowsAZ}>Sort {showSortOrder === "asc" ? "A-Z" : "Z-A"} </button>
        </div>
       
        <div>
        <button className="btn btn-primary btn-sm" onClick={sortLatestOldest}> Sort by Date {sortDateOrder === "ascending" ? "Newest First" : "Oldest First"} </button>

        </div>
       
     <button className="btn btn-primary btn-sm" onClick={resetShowData}>Clear</button>
        <div>
        
        </div>
     
        <div>
          <Link to="/search">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      </Link>
        </div>
     
      
     
   
    

      </div>
      
    
  );
}
