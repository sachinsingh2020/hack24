import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addStatus } from "../utils/cardSlice";
import { useNavigate } from "react-router-dom";
import { login, register } from "../redux/actions/user";
import toast from "react-hot-toast";


const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const { message, error, isAuthenticated, loading } = useSelector(state => state.user);


  useEffect(() => {
    if (error) {
      dispatch({ type: 'clearError' });
    }
    if (message) {
      dispatch({ type: 'clearMessage' });
    }
    if (isAuthenticated) {
      toast.success(message);
      navigate('/home');
    }
  }, [dispatch, error, message, isAuthenticated])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignIn) {
      await dispatch(login({ email, password }));
    } else {
      await dispatch(register({ firstName, lastName, email, password }));
    }
    //   try {
    //     if (isSignIn) {
    //       // Handle sign-in API call
    //       const response = await axios.post('https://iiit-colloboration-app-backend-2.vercel.app/api/v1/login', { email, password });
    //       console.log("Sign in successful:", response.data);
    //       dispatch(addStatus(true));
    //       navigate("/home")
    //     } else {
    //       // Handle sign-up API call
    //       const response = await axios.post('https://iiit-colloboration-app-backend-2.vercel.app/api/v1/register', { firstName, lastName, email, password });
    //       console.log("Sign up successful:", response.data);

    //       dispatch(addStatus(true))
    //     }
    //   } catch (error) {

    //     alert("no")
    //     console.error("There was an error:", error.response ? error.response.data.message : error.message);
    //     dispatch(addStatus(false));
    //   }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <input
              type="text"
              placeholder="First Name"
              value={firstName} // Bind value to state
              onChange={(e) => setfirstname(e.target.value)} // Update state on change
              className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

          )}

          {!isSignIn && (
            <input
              type="text"
              placeholder="Last Name"
              value={lastName} // Bind value to state
              onChange={(e) => setlastname(e.target.value)} // Update state on change
              className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

          )}

          <input
            type="text"
            placeholder="Email or mobile number"
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)}

            className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="password"
            placeholder="Password"
            value={password} // Bind value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          {isSignIn && (
            <>
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-gray-400 hover:underline">
                Forgot password?
              </a>
            </>
          )}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-400">
            {isSignIn ? "New User?" : "Already have an account?"}{" "}
            <span
              onClick={toggleForm}
              className="text-white hover:underline cursor-pointer"
            >
              {isSignIn ? "Sign up now." : "Sign in now."}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
