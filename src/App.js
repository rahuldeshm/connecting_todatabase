import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [retry, setRetry] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  function retryingHandler() {
    setRetry(false);
    console.log("stopped retrying");
  }
  function fetchMoviesAfterfivesec() {
    if (retry) {
      setTimeout(() => {
        fetchMovies();
      }, 5000);
    }
  }
  async function fetchMovies() {
    setisLoading(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        throw new Error("Something went wrong ... retrying!");
      }
      const data = await res.json();
      setmovies(data.results);
    } catch (error) {
      if (retry === true) {
        fetchMoviesAfterfivesec();
      }
      setError(error.message);
    }
    setisLoading(false);
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
      <section>
        {isLoading && <h1>is Loading</h1>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>found no movies</p>}
        {!isLoading && error && (
          <>
            <p>{error}</p>{" "}
            <button onClick={retryingHandler}>Stop retring</button>
          </>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
