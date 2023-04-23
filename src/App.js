import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setmovies] = useState([
    {
      episode_id: 2,
      title: "Some Dummy Movie 2",
      opening_crawl: "This is the second opening text of the movie",
      release_date: "2021-05-19",
    },
  ]);
  async function fetchMovies() {
    try {
      const res = await axios.get("https://swapi.dev/api/films/");
      setmovies(res.data.results);
    } catch {
      console.log("errorbackend");
    }
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
