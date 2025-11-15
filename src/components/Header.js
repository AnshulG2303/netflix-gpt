
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { USER_AVATAR } from "../utils/constants";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
      navigate("/browse");
    } else {
    // User is signed out
    // ...
    dispatch(removeUser());
    navigate("/");
  }
});
return () => unsubscribe();
}, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* always show brand on the left */}
      <img className="w-44" src={LOGO} alt="logo" />
      <div className="flex items-center p-2">
        {/* if user exists always show avatar (use USER_AVATAR fallback) */}
        {user && (
          <img
            className="w-12 h-12 rounded-full"
            src={user.photoURL || USER_AVATAR}
            alt="User Avatar"
          />
        )}

        {/* show Sign Out only when user exists and not on the login page */}
        {user && (
          <button onClick={handleSignOut} className="ml-4 text-white font-bold">
            Sign Out
          </button>
        )}
      </div>
    </div>
  )
};

export default Header;