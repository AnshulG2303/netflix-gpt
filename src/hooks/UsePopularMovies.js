import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    // Only fetch if data doesn't exist (memoization)
    if (!popularMovies) {
      const getPopularMovies = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?&page=1",
          API_OPTIONS
        );
        const json = await response.json();
        dispatch(addPopularMovies(json.results));
      };
      getPopularMovies();
    }
  }, [dispatch, popularMovies]);
};

export default usePopularMovies;