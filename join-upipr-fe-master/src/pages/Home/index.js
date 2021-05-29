import React, { useState } from 'react';
import axios from "axios";
import logo from './star-wars-logo.png';
import './index.css';

function HomePage() {
  const [query,setQuery]=useState("")
  const erasequery=()=>{
  setQuery("")
  }
  const handlequery=(e)=>{
    setQuery(e.target.value)
    axios.get(`https://swapi.dev/api/people/?search=${query}`)
    .then(res=>console.log(res))
    
  }
 
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="search-input">
      <div className="x_div">
      <input  placeholder="Search by name" value={query} onChange={handlequery}/>
      {query.length>0 && <div onClick={erasequery}>X</div>}
      </div>
      <div className="search_icon">
      <i class="fa fa-search"></i>
      </div>
      </div>
      
    </div>
  );
}

export default HomePage;
