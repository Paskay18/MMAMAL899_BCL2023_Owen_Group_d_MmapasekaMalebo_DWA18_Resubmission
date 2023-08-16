import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import AddFavourites from "./AddFavourites";
import LogoHeader from "./LogoHeader";

const genres = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function GenresSortSearch() {
  const [favourites, setFavourites] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = parseInt(searchParams.get("genres"));
  const [show, setShowData] = React.useState([]);

  const differentGenres = typeFilter
    ? show.filter((show) => show.genres.includes(typeFilter))
    : show;

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);

  const formatUpdatedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
    return formattedDate;
  };

  const addFavouritesShow = (show) => {
    const newFavouritesList = [...favourites, show];
    setFavourites(newFavouritesList);
  };

  const showElements = differentGenres.map((show) => (
    <div className="col-4 col-sm-3 col-md-3 col-lg-2 mb-3" key={show.id}>
      <div className="card flex-fill" style={{ width: "100%" }}>
        <Link to={`/${show.id}`}>
          <img className="card-img-top rounded-0" src={show.image} alt="none" />
        </Link>
        <div className="card-body p-0 text-center">
          <h5 className="card-title">{show.title}</h5>
        </div>
        <ul className="list-group list-group-flush text-center fs-6">
          <li className="list-group-item p-0">Seasons: {show.seasons}</li>
          <li className="list-group-item p-0">
            Last updated: {formatUpdatedAt(show.updated)}
          </li>
          <li className="list-group-item p-0">
            {/* <AddFavourites
              handleFavouritesClick={() => addFavouritesShow(show)}
              isFavorite={favourites.includes(show)}
            /> */}
          </li>
        </ul>
      </div>
    </div>
  ));

  return (
    <div className="container-fluid">
      <LogoHeader />
      <div className="d-flex justify-content-around m-1">
      <Link to="/"><button className="btn btn-primary">Back</button></Link>
      <div>
            <button className="btn btn-primary d-flex ">
            <Link
              to="."
              style={{
                textDecoration: "none",
                marginLeft: "15px",
                color: "black",
                fontSize: "12px",
                color: "white" 
                 // Add margin before the "Clear" link
              }}
            >
              Clear
            </Link>
            </button>
           
          </div>
          </div>
      <div className="container-fluid row">
        <div className="d-flex">
          <div className=" d-flex flex-wrap justify-content-center align-items-center">
            
            {Object.keys(genres).map((genreId) => (
           <button className="btn btn-primary m-1">
           <Link
              
                key={genreId}
                to={`?genres=${genreId}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginRight: "15px",
                  fontSize: "12px",
                  color: "white", // Add margin between genre links
                }}
              >
                {genres[genreId]}
              </Link>
              </button>
            ))}
          
   

          </div>
          
        </div>
      </div>
      <div className="row">{showElements}</div>
    </div>
  );
}
