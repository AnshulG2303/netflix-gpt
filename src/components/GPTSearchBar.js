import openai from "../utils/openai";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    console.log(gptResults.choices?.[0]?.message?.content);

    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[40%] sm:pt-[30%] md:pt-[20%] lg:pt-[10%] flex justify-center px-3 sm:px-4">
      <form
        className="w-full sm:w-11/12 md:w-2/3 lg:w-1/2 bg-black/60 backdrop-blur-md rounded-lg shadow-2xl p-4 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            ref={searchText}
            type="text"
            className="flex-1 p-3 sm:p-4 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all placeholder-gray-400 text-sm sm:text-base"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-200 whitespace-nowrap min-h-[44px] text-sm sm:text-base"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </div>
      </form>
    </div>
  );
};
export default GptSearchBar;