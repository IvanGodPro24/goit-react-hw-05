import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../../cinema-api";
import css from "./MovieCast.module.css";
import unknownActor from "../../assets/pngwing.com.png";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const data = await fetchCast(Number(movieId));

        setCast(data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCredits();
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
        <>
          <ul className={css.list}>
            {cast.map(({ id, character, name, profile_path }) => (
              <li key={id} className={css.item}>
                {profile_path !== null ? (
                  <img
                    src={`http://image.tmdb.org/t/p/original/${profile_path}`}
                    alt={name}
                    className={css.image}
                  />
                ) : (
                  <img
                    src={unknownActor}
                    alt="uknown-actor"
                    className={css.image}
                  ></img>
                )}

                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>We don&apos;t have cast for this movie</p>
      )}
    </>
  );
};

export default MovieCast;
