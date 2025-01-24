import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetails } from "../../cinema-api";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";
import BackLink from "../../components/BackLink/BackLink";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLink = location.state ?? "/movies";

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoader(true);
        const data = await fetchDetails(Number(movieId));

        setDetails(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchInfo();
  }, [movieId, setError]);

  const {
    title,
    release_date,
    poster_path,
    vote_average,
    overview,
    homepage,
    genres,
    budget,
    tagline,
    spoken_languages: languages,
    runtime,
    production_companies: companies,
  } = details;

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {details ? (
        <>
          <BackLink to={backLink} />
          <div className={css.details}>
            <div>
              {poster_path !== null ? (
                <img
                  src={`http://image.tmdb.org/t/p/original/${poster_path}`}
                  alt={title}
                  className={css.image}
                />
              ) : (
                <p className={css.unknown}>No image available</p>
              )}

              {tagline !== "" && <h3 className={css.tagline}>«{tagline}»</h3>}
            </div>
            <div className={css.content}>
              <h1>{title}</h1>

              <div>
                <p className={css.start}>Average vote: {vote_average}/10</p>
                <p className={css.start}>Release Date: {release_date}</p>
                <p className={css.start}>Runtime: {runtime} minutes</p>
                {budget === 0 ? null : (
                  <p className={css.start}>Budget: {budget}$</p>
                )}
              </div>

              <div>
                <h2 className={css.start}>Overview</h2>
                <p className={css.overview}>{overview}</p>
              </div>

              <a href={homepage} target="_blank" className={css.homepage}>
                Homepage: {homepage}
              </a>

              <div>
                <h2 className={css.start}>Genres</h2>
                <ul>
                  {genres &&
                    genres.map(({ id, name }) => (
                      <li key={id}>
                        <p className={css.start}>{name}</p>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className={css.start}>Languages</h2>

                <ul>
                  {languages &&
                    languages.map(({ english_name, iso_639_1 }) => (
                      <li key={iso_639_1}>
                        <p className={css.start}>{english_name}</p>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className={css.production}>Production Companies</h2>
                <ul className={css["company-list"]}>
                  {companies &&
                    companies.map(({ id, logo_path, name }) => (
                      <li key={id} className={css.companies}>
                        {logo_path !== null ? (
                          <img
                            src={`http://image.tmdb.org/t/p/original/${logo_path}`}
                            alt={name}
                            className={css.logo}
                          />
                        ) : (
                          <p>{name}</p>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2>Additional info</h2>

            <div className={css.links}>
              <nav>
                <ul>
                  <li>
                    <Link to="cast" state={location.state}>Cast</Link>
                  </li>
                  <li>
                    <Link to="reviews" state={location.state}>Reviews</Link>
                  </li>
                </ul>
              </nav>

              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MovieDetailsPage;
