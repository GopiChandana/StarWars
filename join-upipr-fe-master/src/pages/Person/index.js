import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import axios from "axios";
function Person() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let urlsplitter = location.pathname.split("/");
  let id = urlsplitter[urlsplitter.length - 1];

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/${id}/`)

      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="person">
      <div className="details_card">
        <p>
          <div>Name </div>
          <div>-</div>
          <strong>{data.name}</strong>
        </p>
        <p>
          <div>BirthYear </div>
          <div>-</div>
          <strong>{data.birth_year}</strong>
        </p>
        <p>
          <div>Gender </div>
          <div>-</div>
          <strong>{data.gender}</strong>
        </p>
        <p>
          <div>EyeColour</div>
          <div>-</div>
          <strong>{data.eye_color}</strong>
        </p>
        <p>
          <div>Height </div>
          <div>-</div>
          <strong>{data.height}</strong>
        </p>
      </div>
    </div>
  ) : (
    <div class="preloader">
      <div className="loading">Loading</div>
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
      <span class="line line-4"></span>
      <span class="line line-5"></span>
      <span class="line line-6"></span>
      <span class="line line-7"></span>
      <span class="line line-8"></span>
      <span class="line line-9"></span>
    </div>
  );
}

export default Person;
