import React, { useEffect, useState } from "react";

import AddFavourites from "./AddFavourites";
import { v4 as uuidv4 } from 'uuid';
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "./Carousel";
import LogoHeader from "./LogoHeader";
import NavBar from "./NavBar";
import supabase from "../config/supabase";

const genres = [
  { id: 1, name: "Personal Growth" },
  { id: 2, name: "True Crime and Investigative Journalism" },
  { id: 3, name: "History" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Entertainment" },
  { id: 6, name: "Business" },
  { id: 7, name: "Fiction" },
  { id: 8, name: "News" },
  { id: 9, name: "Kids and Family" },
];




export default function Data() {
  
    const v4Id = uuidv4();
  
    const [show, setShowData] = React.useState([]);
    const [favourites, setFavourites] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedGenre, setSelectedGenre] = React.useState(null);
    const [showSortOrder, setShowSortOrder] = useState("asc");
    const [sortDateOrder, setSortDateOrder] = useState("ascending")

      /* favs */
  const [fetchError, setFetchError] = useState(null)
  const [favouritesDatabase, setFavouritesDatabase] = useState(null)
  const [sortedFavs, setSortedFavs] = useState(null)
  const [sortButtonClicked, setSortButtonClicked] = useState(false)


  
  
    React.useEffect(() => {
      fetch("https://podcast-api.netlify.app/shows")
        .then((response) => response.json())
        .then((data) => {
          setShowData(data);
          setLoading(false);
        });
    }, []);
  
    const addFavouritesShow = (show) => {
      const newFavouritesList = [...favourites, show];
      setFavourites(newFavouritesList);
    };
  

    //changes date on the shows
    const formatUpdatedAt = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        day: "numeric",
        month: "long",
      });
      return formattedDate;
    };
  

    //changes date on the favourite shows
    const dateAndTime = (dateString) => {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      const formattedDate = date.toLocaleDateString(undefined, options);
      return formattedDate;
    };
    
    const handleGenreFilter = (genreId) => {
      setSelectedGenre(genreId);
      if (genreId === null) {
        setShowData(show);
      } else {
        const filteredShows = show.filter((show) => show.genres.includes(genreId));
        setShowData(filteredShows);
      }
    };

    const resetShowData = () => {
      fetch("https://podcast-api.netlify.app/shows")
        .then((response) => response.json())
        .then((data) => {
          setShowData(data);
          setLoading(false);
        });
    };

    const sortShowsAZ = () => {
      const sortedShows = show.slice().sort((a, b) => {
        return showSortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
      setShowData(sortedShows);
      setShowSortOrder(showSortOrder === "asc" ? "desc" : "asc");
    };

    const sortLatestOldest = () => {
      const sortedShows = show.slice().sort((a, b) => {
        const dateA = new Date(a.updated).getTime();
        const dateB = new Date(b.updated).getTime();
        return sortDateOrder === "ascending" ? dateA - dateB : dateB - dateA;
      });
      setShowData(sortedShows);
      setSortDateOrder(sortDateOrder === "ascending" ? "desc" : "ascending");
    };
    
    
 
 //favourites sorting

function SortZToA(){
  setSortedFavs(favouritesDatabase.sort((a,b) => b.showTitle.localeCompare(a.showTitle)))
  setSortButtonClicked(true)
}
function SortAToZ(){
  setSortedFavs(favouritesDatabase.sort((a,b) => a.showTitle.localeCompare(b.showTitle)))
  setSortButtonClicked(true)
}

function Newest() {
  setSortedFavs(favouritesDatabase.sort((a, b) => new Date(b.Added) - new Date(a.Added)));
  setSortButtonClicked(true);
}

function Oldest() {
  setSortedFavs(favouritesDatabase.sort((a, b) => new Date(a.Added) - new Date(b.Added)));
  setSortButtonClicked(true);
}



  useEffect(() => {
    const fetchFavourites = async () => {
      const { data, error } = await supabase
        .from('favourites')
        .select()

      if (error) {
        setFetchError('error fetching data')
        setFavouritesDatabase(null)
        console.log(error)
      }

      if (data) {
        setFavouritesDatabase(data)
        setFetchError(null)
      }
    }
    fetchFavourites()
  }, [favouritesDatabase])

  const handleDelete = async (title) => {
    const { data, error } = await supabase
      .from('favourites')
      .delete()
      .eq('title', title)
    if (error) {
      console.log(error)
    }
    if (data) {
    }
  }

  return (
    <div className="bg-gray">
       <LogoHeader />
      <NavBar 
      selectedGenre={selectedGenre} 
      handleGenreFilter={handleGenreFilter}
      sortShowsAZ={sortShowsAZ}
      showSortOrder={showSortOrder}
      resetShowData={resetShowData}
      sortLatestOldest={sortLatestOldest}
      sortDateOrder={sortDateOrder}
      />

      {/* {favouritesDatabase && (
        <div className="favourites-data">

          {favouritesDatabase.map((favs) => {
            return(
              <p style={{color:"white"}} >{favs.title}</p>
            )
          })}
        </div>
      )} */}
 <div className="bg-black">
      <Carousel />
</div>

{/*       
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
      )} */}

      {/* displays the favourites */}

{favouritesDatabase && favouritesDatabase.length > 0 && (
  <>
  <h2  className="m"style={{ color: "white" }}>Favourites</h2>
   <div className="">
    <button  className="btn btn-primary btn-sm  m-1 p-0" onClick={SortAToZ}>SortA-Z</button>
    <button  className="btn btn-primary btn-sm  m-1 p-0" onClick={SortZToA}>SortZToA</button>
    <button className="btn btn-primary btn-sm  m-1  p-0" onClick={Oldest}>Oldest </button>
    <button className="btn btn-primary btn-sm  m-1 p-0" onClick={Newest}>Newest </button>
    </div>
    <div className="favourites-data d-flex favourites-container ">
      {(sortButtonClicked ? sortedFavs : favouritesDatabase).map((favs) => (
       <div className="p-2">
       <div className="col-md-3" key={favs.title}>
       <img src={favs.image} width={"200rem"} />
         <div className="description">
          <p className="fs-6"style={{ color: "white" }}>Show: {favs.showTitle}</p>
          <p style={{ color: "white" }}>Episode Title: {favs.title}</p>
          
          <p style={{ color: "white" }}>Added: {dateAndTime(favs.Added)}</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => handleDelete(favs.title)}>Delete</button>
        </div>
        </div>
      ))}
    </div>
  </>
)}

    {/* displays show data */}
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
                      {show.genres.map((genreId) => genres.find(genre => genre.id === genreId)?.name).join(", ")}
                    </li>
                    {/* <li className="list-group-item p-0">

                      <AddFavourites
                        handleFavouritesClick={() => addFavouritesShow(show)}
                        isFavorite={favourites.includes(show)}
                      />
                    </li> */}
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
