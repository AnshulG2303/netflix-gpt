import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 hover:scale-110 transition-transform duration-300">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;

// import { IMG_CDN_URL } from "../utils/constants";

// const MovieCard = ({ posterPath }) => {
//   if (!posterPath) return null;
//   return (
//     <div className="w-36 md:w-48 transform hover:scale-110 transition-transform duration-300">
//       <img
//         alt="Movie Poster"
//         src={IMG_CDN_URL + posterPath}
//         className="rounded-md shadow-lg"
//       />
//     </div>
//   );
// };

// export default MovieCard;
