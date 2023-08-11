import React from "react";

export default function Data() {
  const [show, setShowData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-8">
        {show.map((show) => (
          <div key={show.id} className="col mb-3 d-flex">
            <div className="card flex-fill" style={{ width: "14rem" }}>
              <img className="card-img-top rounded-0" src={show.image} alt="none" />
              <div className="card-body">
                <h5 className="card-title">{show.title}</h5>
                <p className="card-text">{show.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Seasons: {show.seasons}</li>
                <li className="list-group-item">{show.updated}</li>
                <li className="list-group-item">Add to favourites</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
