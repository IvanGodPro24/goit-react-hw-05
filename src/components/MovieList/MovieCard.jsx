import css from "./MovieCard.module.css";

const MovieCard = ({ title, poster_path }) => {
  return (
    <>
      {poster_path !== null ? (
        <img
          src={`http://image.tmdb.org/t/p/original/${poster_path}`}
          alt={title}
          className={css.image}
        />
      ) : (
        <p className={css.unknown}>No image available</p>
      )}

      <p className={css.title}>{title}</p>
    </>
  );
};

export default MovieCard;
