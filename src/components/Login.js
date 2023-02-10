import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
// import {Navigate} from 'react-router-dom'
import { Alert } from "./Alert";
import { async } from "@firebase/util";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPassword =  async () => {
    if(!user.email) return setError('Please enter your email')
    try {
      await resetPassword(user.email)
      setError('We sent you an email with a link to reset your password :)')
    } catch (error) {
      setError(error.message)
    }
   
  }

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6  pb-8 mb-4 mt-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@.company.ltd"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-violet-500 hover:bg-violet-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  ">
            Login
          </button>
          <a
            href="#!"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            Forgot password?
          </a>
        </div>
      </form>
      <p className="my-4 text-sm flex justify-start px-3">
        Dont have an Account?{" "}
        <Link className=" text-blue-700 hover:text-blue-900" to="/register">
          Register
        </Link>
      </p>
      <button
        onClick={handleGoogleSignIn}
        className=" bg-slate-50 hover-bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Login with Google
      </button>
    </div>
  );
};
