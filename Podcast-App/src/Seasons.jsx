import React from "react";
import { useParams } from "react-router-dom";

export default function Seasons() {
  const params = useParams();
  const [show, setShow] = React.useState({});
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true); // Set loading to true when starting a new fetch
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        setLoading(false); // Set loading to false once data is fetched
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
    <div className="container text-center ">
      {loading ? (
        <h2>Loading.....</h2>
      ) : (
        <div>
          <img src={show.image} width={"200rem"} alt={show.title} />
          <h2>{show.title}</h2>
          <p>{show.description}</p>
          {show.seasons && show.seasons.length > 0 ? (
            show.seasons.map((season) => (
              <div key={season.season}>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSeasonClick(season)}
                  >
                    <h4>Season {season.season}</h4>
                    {season.description}
                  </button>
                </div>
                {selectedSeason && selectedSeason.season === season.season && (
                  <div>
                    {selectedSeason.episodes.map((episode) => (
                      <div key={episode.id}>
                        <span>
                          <img
                            src={season.image}
                            width={"30rem"}
                            alt={episode.title}
                          />
                          <h3>
                            {episode.episode}. {episode.title}
                          </h3>
                        </span>
                        <p>{episode.description}</p>
                        <audio controls>
                          <source src={episode.file} />
                        </audio>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <h2>No seasons available</h2>
          )}
        </div>
      )}
    </div>
  );
}
