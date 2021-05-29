import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import logo from "./star-wars-logo.png";
import "./index.css";

function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activequeryIndex, setActivequeryIndex] = useState(-1);
  const inputref = React.useRef();
  const scrollref = React.useRef();
  const history = useHistory();


  const erasequery = () => {
    inputref.current.value = "";
    setQuery("");
    setResults([]);
    setActivequeryIndex(-1);
  };


  React.useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`https://swapi.dev/api/people/?search=${query}`)
        .then((res) => setResults(res.data.results));
    }
    if (activequeryIndex > -1 && results.length > 0) {
      inputref.current.value = results[activequeryIndex].name;
    }
  }, [query, activequeryIndex]);


  const handleSearchquery = () => {
    let urlsplitter =
      results &&
      activequeryIndex > -1 &&
      results[activequeryIndex].url.split("/");
    let id = urlsplitter[urlsplitter.length - 2];
    history.push(`person/${id}`);
  };


  let delay = 500;
  const handlequery = debouncer((e) => {
    setQuery(e);
  }, (delay = 500));


  const handleKeyUp = (e) => {
    switch (e.keyCode) {
      case 13:
        handleSearchquery();
        break;
      case 38:
        scrollref.current.scrollTop -= 20;
        if (activequeryIndex < 0) {
          setActivequeryIndex(results && results.length - 1);
        }
        setActivequeryIndex((prev) => prev - 1);
        if (activequeryIndex === -1) {
          setActivequeryIndex(results && results.length - 1);
        }

        break;
      case 40:
        scrollref.current.scrollTop += 20;
        if (activequeryIndex === results.length - 1) {
          setActivequeryIndex(-1);
        }
        setActivequeryIndex((prev) => prev + 1);
        if (activequeryIndex === results.length - 1) {
          setActivequeryIndex(0);
        }
        break;
      default:
        break;
    }
  };


  function debouncer(fn, delay = 500) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  }

  return (
    <div onKeyUp={handleKeyUp}>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div
        className={
          results.length === 0 || query === ""
            ? "search-input"
            : "search-input search-results"
        }
      >
        <div className="x_div">
          <input
            placeholder="Search by name"
            ref={inputref}
            onChange={(e) => handlequery(e.target.value)}
          />
          {query !== "" && <div onClick={erasequery}>X</div>}
        </div>
        {results.length > 0 && <div className="boundary1"></div>}
        <div className="search_icon" onClick={handleSearchquery}>
          {query !== "" && results.length === 0 ? (
            <div className="spinner">
              <i class="fa fa-spinner"></i>
            </div>
          ) : (
            <i class="fa fa-search"></i>
          )}
        </div>
      </div>

      {results.length > 0 && query !== "" ? (
        <div
          ref={scrollref}
          className={
            results.length >= 4
              ? "results_box"
              : "results_box height_optimization"
          }
        >
          {results.map((item, i) => (
            <div
              className={
                i !== activequeryIndex
                  ? "results_innerbox"
                  : "results_innerbox results_innerbox1"
              }
            >
              <div className="results_inner_firstbox">
                <div>{item.name}</div>
                <div className="birth_year">{item.birth_year}</div>
              </div>
              <div className="results_inner_secondbox">{item.gender}</div>
            </div>
          ))}
        </div>
      ) : query.length > 0 ? (
        <p>Enter a Valid Character Name</p>
      ) : null}
    </div>
  );
}

export default HomePage;
