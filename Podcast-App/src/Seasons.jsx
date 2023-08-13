import React from "react";
import { useParams } from "react-router-dom";

export default function Seasons() {
  const params = useParams();
  const [show, setShow] = React.useState({});
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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
    <div className="container text-center">
      {loading ? (
        <h2>Loading.....</h2>
      ) : (
        <div>
          <img src={show.image} width={"200rem"} alt={show.title} />
          <h2>{show.title}</h2>
          <p>{show.description}</p>
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
                    <div key={episode.id}>
                      <span>
                        <img
                          src={show.image}
                          width={"30rem"}
                          alt={episode.title}
                        />
                        <h4>
                          {episode.episode}: {episode.title}
                        </h4>
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
          ) : (
            <h2>No seasons available</h2>
          )}
        </div>
      )}
    </div>
  );
}
