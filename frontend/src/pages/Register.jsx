import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../url";

export const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const userdata = {
    username: username,
    email: email,
    password: password,
  };
  const navigate = useNavigate();
  const registeruser = async () => {
    try {
      const resp = await axios.post(URL + "/api/auth/register", userdata);
      console.log(resp);
      setusername(resp.data.username);
      setemail(resp.data.email);
      setpassword(resp.data.password);
      navigate("/login");
    } catch (error) {
      seterror(true);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Market</Link>
        </h1>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full h-[83vh] flex justify-center items-center ">
        <div className="justify-center items-center space-y-4 w-[80%] md:w-[25%]   flex flex-col ">
          <h1 className="text-2xl font-bold text-center ">
            Create a New Account
          </h1>
          <input
            className="w-full px-4  my-5 py-2 border-2 border-black outline-0"
            type="text"
            name=""
            id=""
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            className="w-full px-4  my-5 py-2 border-2 border-black outline-0"
            type="email"
            name=""
            id=""
            placeholder="Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            className="w-full px-4 my-5  py-2 border-2 border-black outline-0"
            type="password"
            name=""
            id=""
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button
            onClick={registeruser}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Register
          </button>
          {error && <h3 className="text-red-500">Something went wrong!</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>Already a member?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
