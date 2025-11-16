import Header from "./Header";
import  MainContainer  from "./MainContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import SecondaryContainer  from "./SecondaryContainer";
import usePopularMovies from "../hooks/UsePopularMovies";
import useTopRatedMovies from "../hooks/USeTopRatedMovies";
import useTopUpcomingMovies from "../hooks/UseUpcomingMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";


const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch); 

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTopUpcomingMovies();
  return (
    <div>
      <Header />
      {showGPTSearch ? (<GPTSearch />) : (
      <>
      <MainContainer />
      <SecondaryContainer />
      </>
      )}
    </div>
  );
};

export default Browse;