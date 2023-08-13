import React from "react";
import AddFavourites from "./AddFavourites";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import LogoHeader from "./LogoHeader";
import NavBar from "./NavBar";

export default function Data() {
  const v4Id = uuidv4();

  const [show, setShowData] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // New loading state

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  const addFavouritesShow = (show) => {
    const newFavouritesList = [...favourites, show];
    setFavourites(newFavouritesList);
  };

  const formatUpdatedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
    return formattedDate;
  };

  return (
    <div className="bg-black">
      <LogoHeader />
      <NavBar />
      <Carousel />
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
      
      {loading ? ( // Display loading indicator while data is being fetched
        <h2>Loading.....</h2>
      ) : (
        
        <div className="container">
           
          <div className="row row-cols-3 row-cols-sm-3 row-cols-md-6 row-cols-lg-9">
            {show.map((show) => (
              <div key={show.id} className="col mb-3 d-flex">
                <div className="card flex-fill" style={{ width: "14rem" }}>
                  <Link to={`/${show.id}`}>
                    <img className="card-img-top rounded-0" src={show.image} alt="none" />
                  </Link>
                  <div className="card-body p-0 text-center">
                    <h5 className="card-title">{show.title}</h5>
                  </div>
                  <ul className="list-group list-group-flush text-center fs-6">
                    <li className="list-group-item p-0">Seasons: {show.seasons}</li>
                    <li className="list-group-item p-0">Last updated: {formatUpdatedAt(show.updated)}</li>
                    <li className="list-group-item p-0">
                      <AddFavourites
                        handleFavouritesClick={() => addFavouritesShow(show)}
                        isFavorite={favourites.includes(show)}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
