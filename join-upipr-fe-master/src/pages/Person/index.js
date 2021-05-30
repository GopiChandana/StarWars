import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import axios from "axios";
function Person() {
  const [data, setData] = useState([]);
  const location = useLocation();
  let urlsplitter = location.pathname.split("/");
  let id = urlsplitter[urlsplitter.length - 1];

  React.useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/${id}/`)
      .then((res) => setData(res.data));
  }, []);
 
  
  return (
    <div className="person">
      <div className="details_card">
        <p>
          <div>Name:</div>
          <strong>{data.name}</strong>
        </p>
        <p>
          <div>BirthYear:</div>
          <strong>{data.birth_year}</strong>
        </p>
        <p>
          <div>Gender:</div>
          <strong>{data.gender}</strong>
        </p>
        <p>
          <div>EyeColour:</div>
          <strong>{data.eye_color}</strong>
        </p>
        <p>
          <div>Height:</div>
          <strong>{data.height}</strong>
        </p>
      </div>
    </div>
  );
}

export default Person;
