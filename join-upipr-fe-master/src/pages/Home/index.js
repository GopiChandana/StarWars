import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import logo from "./star-wars-logo.png";
import "./index.css";

function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activequeryIndex, setActivequeryIndex] = useState(-1);
  const [error, setError] = useState(false);
  const [backspaceOn, setBackspaceOn] = useState(false);
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
    if (query.length > 0 && !backspaceOn) {
      setError(false);
      setBackspaceOn(false);
      axios
        .get(`https://swapi.dev/api/people/?search=${query}`)
        .then((res) => setResults(res.data.results));
    }

    setBackspaceOn(false);
  }, [query]);

  React.useEffect(() => {
    if (activequeryIndex > -1 && results.length > 0) {
      inputref.current.value = results[activequeryIndex].name;
    }
  }, [activequeryIndex]);

  const handleSearchquery = (i) => {
    if (query === "") {
      setError(true);
    } else {
      setError(false);
    }
    setBackspaceOn(false);
    let urlsplitter =
      results &&
      activequeryIndex > -1 &&
      results[activequeryIndex].url.split("/");
    let id = urlsplitter[urlsplitter.length - 2];

    if (query !== "") {
      if (id === undefined) {
        history.push(`/error`);
      } else {
        history.push(`/person/${id}`);
      }
    }
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
        scrollref.current.scrollTop -= 70;
        if (activequeryIndex <= 0) {
          scrollref.current.scrollTop = 580;
          setActivequeryIndex(results && results.length);
        }
        setActivequeryIndex((prev) => prev - 1);
        break;
      case 40:
        scrollref.current.scrollTop += 70;
        if (activequeryIndex === results.length - 1) {
          scrollref.current.scrollTop = 0;
          setActivequeryIndex(-1);
        }
        setActivequeryIndex((prev) => prev + 1);
        break;
      case 8:
        setBackspaceOn(true);
        break;
      default:
        break;
    }
  };

  const handleClick = (elemdata) => {
    let id = +elemdata.url.split("/")[5];
    history.push(`/person/${id}`);
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
            type="text"
            placeholder="Search by name"
            ref={inputref}
            required
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
            <div className="search">
              <i class="fa fa-search"></i>
            </div>
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
              onClick={() => handleClick(item)}
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
      {error && <p>Input field should not be empty</p>}
    </div>
  );
}

export default HomePage;
