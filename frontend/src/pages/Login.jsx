import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import axios from "axios";
import { URL } from "../../url";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../Context/UserContext";

export const Login = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterror] = useState(false);
  const [errdetail, seterrordetail] = useState("");
  const navigate = useNavigate();
  const logindata = {
    username: username,
    password: password,
    email: email,
  };
  const { setUser } = useContext(usercontext);
  const loginuser = async () => {
    try {
      const resp = await axios.post(URL + "/api/auth/login", logindata, {
        withCredentials: true,
      });
      setusername(resp.data.username);
      setemail(resp.data.email);
      setpassword(resp.data.password);
      setUser(resp.data);
      navigate("/");
    } catch (error) {
      seterror(true);
      seterrordetail(error.response.data);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Market</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full h-[83vh] flex justify-center items-center ">
        <div className="justify-center items-center space-y-4 w-[80%] md:w-[25%]   flex flex-col ">
          <h1 className="text-2xl font-bold text-center ">Login</h1>
          <input
            className="w-full px-4  my-5 py-2 border-2 border-black outline-0"
            type="text"
            name=""
            id=""
            placeholder="Username"
            onChange={(e) => {
              setusername(e.target.value);
            }}
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
            onClick={loginuser}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
          >
            Log in
          </button>
          {err && (
            <>
              <p className="text-red-500">Error while Logging in</p>
              <p className="text-red-500 font-bold">{errdetail}</p>
            </>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New Here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
