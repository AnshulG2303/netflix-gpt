import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-3 sm:px-4 md:px-8 lg:px-12 mb-6 sm:mb-8">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold py-3 sm:py-4 text-white">{title}</h1>
      <div className="overflow-x-scroll overflow-y-hidden scrollbar-hide hover:scrollbar-default touch-pan-x">
        <div className="flex gap-2 sm:gap-3 md:gap-4 pb-2">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;



