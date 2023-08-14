import React from "react";
import { useParams } from "react-router-dom";
import AddFavourites from "./AddFavourites";
import supabase from "../config/supabase";
import { StoreStatesFunc } from "./StoreStates";

export default function Seasons() {
  const params = useParams();
  const [show, setShow] = React.useState({});
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // const { setPlayerTitle, setPlayerAudio } = StoreStatesFunc()

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        setSelectedSeason(data.seasons[0]); // Set the first season as default
        setLoading(false);
      });
  }, [params.id]);

  const handleSeasonClick = (season) => {
    if (selectedSeason && selectedSeason.season === season.season) {
      setSelectedSeason(null);
    } else {
      setSelectedSeason(season);
    }
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <h2>Loading.....</h2>
      ) : (

        
      
        <div >
          
         <button>Back</button>


          <div className="text-center">
          <img src={show.image} width={"200rem"} alt={show.title} />
          <h2>{show.title}</h2>
          <p>{show.description}</p>
         </div>
         

          {show.seasons && show.seasons.length > 0 ? (
            <div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Seasons
                </button>
                <ul className="dropdown-menu">
                  {show.seasons.map((season) => (
                    <li key={season.season}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSeasonClick(season)}
                      >
                        Season {season.season}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedSeason && (
                <div>
                  <h3>Season {selectedSeason.season}</h3>
                  {selectedSeason.episodes.map((episode) => (
                    <div className="d-flex">
                    <div key={episode.id}>
                      <div  className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={show.image}
                          width={"100rem"}
                          alt={episode.title}
                        />
                       </div> 
                        <div className="flex-grow-1 ms-3" >
                        <h4>
                          {episode.episode}: {episode.title}
                        </h4>
                     
                      <p>{episode.description}</p>
                      </div>

                      </div>
                      <audio controls>
                        <source src={episode.file} />
                      </audio>
                      <AddFavourites 
                        handleFavouritesClick={() => {
                          const addFav = async () => {
                            console.log('hfhg')
                            const { data, error } = await supabase
                              .from('favourites')
                              .insert({
                                    title: episode.title
                              })
                          }

                          addFav()
                        }}
                      />
                     
                     
                      
                     </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <h2>No seasons available</h2>
          )}
        </div>
      )}
    </div>
  );
}
