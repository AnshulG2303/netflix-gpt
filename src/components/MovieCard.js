import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-28 xs:w-32 sm:w-36 md:w-40 lg:w-48 flex-shrink-0 cursor-pointer group">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="rounded-md transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-black/50 group-hover:ring-2 group-hover:ring-white/20 w-full"
      />
    </div>
  );
};
export default MovieCard;