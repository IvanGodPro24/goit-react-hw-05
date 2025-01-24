import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../cinema-api";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const response = await fetchTrendingMovies();

        setMovies(response.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending Movies</h1>
      <MovieList movies={movies} />

      {loader && <Loader />}
      {error && <Error />}
    </>
  );
};

export default HomePage;
