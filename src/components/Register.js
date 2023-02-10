import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // HANDLE FUNCTION ( INPUS AND SUBMIT ) -
  //capturing user data through envent-inputs. The idea is capturing the input-event information

  // exploring inputEvent object properties / before destructuring (inpunt-event-objects handles events that occur when input elements are changed).
  // const handleChange = (e) => {
  //   console.log(e.target.name, e.target.value);
  // };

  //with destructuring: Deep definition: destructuration the target props (name, value) of the object (e). Syntax of for destructuris the targets props-> target: {name, value}
  // const handleChange = ({target: {name,value}}) => {
  //   console.log({[name]:value}); // {email: 'boablockchain@gmail.com'}
  // };

  // adding setUser --> now, value will be defined on the state/ahora el valor esta definido en el estado: setUser({...user, [name]: value});
  // update state function
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  // function to show the user state when form is submited (and prevent default submit)

  // Sending user data to firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // then, must be sended to firebase /se debe
  // then, function is used in the input onchange event
  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm  font-bold my-2"
            htmlFor="email"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="youremail@.company.ltd"
            className="shadow  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm  font-bold my-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*******"
            className="shadow  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        Already have an Account?
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Login
        </Link>
      </p>
    </div>
  );
}
