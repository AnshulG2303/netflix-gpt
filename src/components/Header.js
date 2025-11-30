import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGptSearch);
  // ✅ Sign out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to login after signout
      })
      .catch(() => {
        navigate("/error");
      });
  };

  // ✅ Watch for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // ✅ Cleanup listener when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);
  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-3 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      {/* Left: Logo */}
      <img className="w-28 sm:w-36 md:w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {/* Right: User controls (only show when user logged in) */}
      {user && (
        <div className="flex items-center gap-1 sm:gap-2">

          {showGPTSearch && (
            <select
              className="hidden sm:block p-2 text-xs sm:text-sm bg-gray-900 text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base bg-sky-700 text-white font-bold rounded-md sm:rounded-lg hover:bg-sky-800 transition whitespace-nowrap"
            onClick={handleGPTSearchClick}
          >
            <span className="hidden sm:inline">{showGPTSearch ? "Homepage" : "GPT Search"}</span>
            <span className="sm:hidden">{showGPTSearch ? "Home" : "Search"}</span>
          </button>

          <img
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white"
            src={user.photoURL || USER_AVATAR}
            alt="User Avatar"
          />

          <button
            onClick={handleSignOut}
            className="hidden sm:block ml-2 md:ml-4 text-white text-sm md:text-base font-bold hover:text-gray-300 transition"
          >
            Sign Out
          </button>

          {/* Mobile Sign Out - Icon only */}
          <button
            onClick={handleSignOut}
            className="sm:hidden ml-1 text-white text-xs font-bold hover:text-gray-300 transition"
            aria-label="Sign Out"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
