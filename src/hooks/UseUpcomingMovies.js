import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopUpcomingMovies} from "../utils/moviesSlice";

const useTopUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getTopUpcomingMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?&page=1', API_OPTIONS);
    const json = await response.json();
    console.log("Upcoming Movies:", json.results);
    dispatch(addTopUpcomingMovies(json.results));
  };

  useEffect(() => {
    getTopUpcomingMovies();
  }, []);
};

export default useTopUpcomingMovies;