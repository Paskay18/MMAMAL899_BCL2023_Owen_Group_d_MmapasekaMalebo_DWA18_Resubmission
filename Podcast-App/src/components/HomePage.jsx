import React from "react";
import AddFavourites from "./AddFavourites";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

export default function Data() {

  const v4Id = uuidv4()

  const [show, setShowData] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);





  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);

  const addFavouritesShow = (show) => {
    const newFavouritesList = [...favourites, show];
    setFavourites(newFavouritesList);
  };

  const formatUpdatedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  return (
<div>

    {favourites.length > 0 && (
      <div>
        <h2>Favorites:</h2>
        <ul>
          {favourites.map((favShow) => (
            <div key={favShow.v4Id}>
            <img src={favShow.image} width={"200rem"} /> 
              
              
              
          </div>
            
          ))}
        </ul>
      </div>
    )}

    <div className="container">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-8">
        {show.map((show) => (
          <div key={show.id} className="col mb-3 d-flex">
               
            <div className="card flex-fill" style={{ width: "14rem" }}>
            <Link to={`/${show.id}`}>
              <img className="card-img-top rounded-0" src={show.image} alt="none" />
              </Link>
              <div className="card-body">
               <h5 className="card-title">{show.title}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Seasons: {show.seasons}</li>
                <li className="list-group-item"> Last updated: {formatUpdatedAt(show.updated)}</li>
                <li className="list-group-item">
                  <AddFavourites
                    handleFavouritesClick={() => addFavouritesShow(show)}
                    isFavorite={favourites.includes(show)}
                  />
                </li>
                <li className="list-group-item"></li>
              </ul>
            </div>
            
          </div>
        ))}
      </div>
      {/* Display the favorite show names */}
     
    </div>
    </div>
  );
}
