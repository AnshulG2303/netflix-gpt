import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  useEffect(() => {
    // Only fetch if data doesn't exist (memoization)
    if (!nowPlayingMovies) {
      const getNowPlayingMovies = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?&page=1",
          API_OPTIONS
        );
        const json = await response.json();
        dispatch(addNowPlayingMovies(json.results));
      };
      getNowPlayingMovies();
    }
  }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;
