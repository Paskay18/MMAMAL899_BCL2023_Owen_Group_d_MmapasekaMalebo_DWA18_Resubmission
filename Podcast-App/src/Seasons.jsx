import React from "react";
import { useParams } from "react-router-dom";

export default function Seasons() {
  const params = useParams();
  const [show, setShow] = React.useState({});
  const [selectedSeason, setSelectedSeason] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => setShow(data));
  }, [params.id]);

  const handleSeasonClick = (season) => {
    if (selectedSeason && selectedSeason.season === season.season) {
      setSelectedSeason(null);
    } else {
      setSelectedSeason(season);
    }
  };

  return (
    <div className="container text-center fw-light">
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      {show.seasons && show.seasons.length > 0 ? (
        show.seasons.map((season) => (
          <div key={season.season}>
            <button type="button" className="btn btn-outline-light" onClick={() => handleSeasonClick(season)}>
              <h4>{season.title}</h4>
              <img src={season.image} width="20%" alt={season.title} />
              {season.description}
            </button>
            {selectedSeason && selectedSeason.season === season.season && (
              <div>
                <h3>Episodes:</h3>
                {selectedSeason.episodes.map((episode) => (
                  <div key={episode.id}>
                    <h3>{episode.title}</h3>
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
        <h2>Loading.....</h2>
      )}
    </div>
  );
}
