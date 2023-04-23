import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  async function fetchMovies() {
    setisLoading(true);
    fetch("https://swapi.dev/api/films/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setmovies(data.results);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // try {
    //   const res = await axios.get("https://swapi.dev/api/films/");
    //   setmovies(res.data.results);
    // } catch {
    //   console.log("errorbackend");
    // }
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      {isLoading && (
        <section>
          <h1>is Loading</h1>
        </section>
      )}
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
