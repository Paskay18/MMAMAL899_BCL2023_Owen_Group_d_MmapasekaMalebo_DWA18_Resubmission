import React, { useState, useEffect } from "react";
import AddFavourites from "./AddFavourites";
import { Link } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShowData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredShows, setFilteredShows] = useState([]); // State for filtered shows

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setLoading(false);
      });
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = show.filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShows(filtered);
  };

  return (
    <div className=" container-fluid bg-black ">
      
      <Link to="/">
      <button className="btn btn-primary m-3" >Back</button>
      
      </Link>
     
      <div className="d-flex align-items-center justify-content-center ">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title..."
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : filteredShows.length === 0 ? (
        <p>No shows found.</p>
      ) : (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {filteredShows.map((show) => (
            <div className="col" key={show.id}>
              <div className="card flex-fill h-100">
                <Link to={`/${show.id}`}>
                  <img
                    className="card-img-top rounded-0"
                    src={show.image}
                    alt="none"
                  />
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
          ))}
        </div>
      )}
    </div>
  );
}
