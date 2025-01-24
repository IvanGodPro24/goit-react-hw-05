import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = ({ movies }) => {
  return (
    <>
      <h1 className={css.title}>Trending Movies</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
