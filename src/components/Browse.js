import Header from "./Header";
import  MainContainer  from "./MainContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import SecondaryContainer  from "./SecondaryContainer";
import usePopularMovies from "../hooks/UsePopularMovies";
import useTopRatedMovies from "../hooks/USeTopRatedMovies";
import useTopUpcomingMovies from "../hooks/UseUpcomingMovies";


const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTopUpcomingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      </div>
  );
};

export default Browse;