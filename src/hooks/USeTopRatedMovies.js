import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  useEffect(() => {
    // Only fetch if data doesn't exist (memoization)
    if (!topRatedMovies) {
      const getTopRatedMovies = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?&page=1",
          API_OPTIONS
        );
        const json = await response.json();
        dispatch(addTopRatedMovies(json.results));
      };
      getTopRatedMovies();
    }
  }, [dispatch, topRatedMovies]);
};

export default useTopRatedMovies;