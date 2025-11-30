import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // redirect new users to browse
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const { uid, email: userEmail, displayName, photoURL } = user;
          dispatch(
            addUser({ uid: uid, email: userEmail, displayName: displayName, photoURL: photoURL })
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <div className="absolute inset-0">
        <img className="w-full h-full object-cover opacity-50" src={BG_URL} alt="logo" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[450px] absolute px-8 sm:px-12 md:px-16 py-12 sm:py-14 md:py-16 bg-black/75 backdrop-blur-sm my-20 sm:my-24 mx-4 sm:mx-auto right-0 left-0 text-white rounded-md shadow-2xl"
      >
        <h1 className="font-bold text-2xl sm:text-3xl mb-6 sm:mb-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 sm:p-4 my-2 w-full bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm sm:text-base"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 sm:p-4 my-2 w-full bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm sm:text-base"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 sm:p-4 my-2 w-full bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm sm:text-base"
        />
        <p className="text-red-500 font-bold text-xs sm:text-sm py-2">{errorMessage}</p>
        <button
          type="button"
          className="p-3 sm:p-4 my-4 sm:my-6 bg-red-600 hover:bg-red-700 w-full rounded-md font-semibold text-sm sm:text-base transition-colors duration-200 min-h-[44px]"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-3 sm:py-4 cursor-pointer text-sm sm:text-base text-gray-400 hover:text-white transition-colors" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;