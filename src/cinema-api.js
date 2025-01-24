import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDQwMTMyY2YyMTI5Njk3MmU1MDEwZTFkNGU3NWNjOCIsIm5iZiI6MTY0Nzk2OTEyMC4yMjMsInN1YiI6IjYyM2EwMzYwOGVjNGFiMDA0NGYxZWE5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoua3gPuvK2AfNj7Gm2voI60SbvMpqhMvl1Dfoc1eOU",
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get("/3/trending/movie/day", options);

  return response.data;
};

export const fetchDetails = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}`, options);

  return response.data;
};

export const fetchCast = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}/credits`, options);

  return response.data;
};

export const fetchReviews = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}/reviews`, options);

  return response.data;
};

export const searchMovies = async (query, page) => {
  const response = await axios.get(`/3/search/movie`, {
    ...options,
    params: {
      query,
      page,
    },
  });

  return response.data;
};