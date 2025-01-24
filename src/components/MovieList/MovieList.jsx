import { Link, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.item}>
          <Link to={`/movies/${id}`} state={location}>
            <MovieCard title={title} poster_path={poster_path} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
