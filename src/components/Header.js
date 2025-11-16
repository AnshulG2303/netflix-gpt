import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/GPTSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import {changeLanguage} from "../utils/configSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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
  dispatch(toggleGPTSearchView());
};

const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
};
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      {/* Left: Logo */}
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {/* Right: User controls (only show when user logged in) */}
      {user && (
        <div className="flex items-center p-2">
        
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          <button className="py-2 px-4 mx-4 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-800 transition" 
        onClick={handleGPTSearchClick}>
            GPT Search
          </button>

          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src={user.photoURL || USER_AVATAR}
            alt="User Avatar"
          />

          <button
            onClick={handleSignOut}
            className="ml-4 text-white font-bold hover:text-gray-300 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
