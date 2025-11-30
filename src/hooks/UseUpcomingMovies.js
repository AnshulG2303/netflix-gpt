import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopUpcomingMovies } from "../utils/moviesSlice";

const useTopUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  useEffect(() => {
    // Only fetch if data doesn't exist (memoization)
    if (!upcomingMovies) {
      const getTopUpcomingMovies = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?&page=1",
          API_OPTIONS
        );
        const json = await response.json();
        dispatch(addTopUpcomingMovies(json.results));
      };
      getTopUpcomingMovies();
    }
  }, [dispatch, upcomingMovies]);
};

export default useTopUpcomingMovies;