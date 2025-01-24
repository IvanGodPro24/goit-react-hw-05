import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { searchMovies } from "../../cinema-api";
import MovieList from "../../components/MovieList/MovieList";
import toast from "react-hot-toast";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        setLoader(true);
        const data = await searchMovies(query, page);

        if (data.total_results === 0) {
          toast.error("No movies found for your query!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          return;
        }

        if (page === data.total_pages - 1) {
          toast.success("You are almost there! Just one more page left!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }

        setMovies((prevMovies) =>
          page === 1 ? data.results : [...prevMovies, ...data.results]
        );

        setTotalPages(data.total_pages);

        if (page === data.total_pages) {
          toast.error("You are all set, no more pages!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getMovies();
  }, [page, query]);

  const updateQueryString = (query) => {
    setPage(1);
    const nextParams = query !== "" ? { query } : {};
    setSearchParams(nextParams);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchForm onSubmit={updateQueryString} />
      {loader && <Loader />}
      {error && <Error />}
      <MovieList movies={movies} />
      {movies.length > 0 && page < totalPages && (
        <LoadMoreBtn onLoad={nextPage} />
      )}
    </>
  );
};

export default MoviesPage;
