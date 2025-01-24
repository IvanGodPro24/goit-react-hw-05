import { Route, Routes } from "react-router-dom";
import "./App.css";
import { fetchTrendingMovies } from "./cinema-api";
import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";
import Navigation from "./components/Navigation/Navigation";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
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
      <div>
        <Toaster />
      </div>

      <Navigation />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {loader && <Loader />}
      {error && <Error />}
    </>
  );
}

export default App;
