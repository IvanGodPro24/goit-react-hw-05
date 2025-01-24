import { useEffect, useState } from "react";
import { fetchReviews } from "../../cinema-api";
import { useParams } from "react-router-dom";
import unknownActor from "../../assets/pngwing.com.png";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews(movieId);

      setReviews(data.results);
    };

    getReviews();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {reviews.length > 0 ? (
        reviews.map(
          ({
            id,
            author,
            author_details: { avatar_path, username },
            content,
          }) => (
            <li key={id} className={css.item}>
              <div className={css.user}>
                {avatar_path !== null ? (
                  <img
                    src={`http://image.tmdb.org/t/p/original/${avatar_path}`}
                    alt={author}
                    className={css.image}
                  />
                ) : (
                  <img src={unknownActor} alt={author} className={css.image} />
                )}

                <p>
                  {author}: {username}
                </p>
              </div>

              <p className={css.content}>{content}</p>
            </li>
          )
        )
      ) : (
        <p className={css.noreviews}>No reviews for this movie</p>
      )}
    </ul>
  );
};

export default MovieReviews;
