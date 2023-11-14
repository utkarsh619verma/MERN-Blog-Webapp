/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usercontext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../../url";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export function Menu() {
  const [show, setshow] = useState(false);
  const { user } = useContext(usercontext);
  const { setUser } = useContext(usercontext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handlelogout = async () => {
    setLoader(true);
    console.log(loader);
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
    console.log(loader);
  };

  return (
    <div>
      <FaBars
        className="cursor-pointer"
        onClick={() => {
          setshow(true);
        }}
      />

      {show && (
        <>
          <div
            className={`bg-[black] z-10 fixed w-[100%] h-[100vh] top-0 left-0 opacity-[0.7] `}
          ></div>
          <div
            className={`fixed h-[100vh] z-20  w-[50vw] py-[20px] space-y-8 px-[50px] bg-black text-white md:w-[20vw] right-0 top-0`}
          >
            <FaBars
              className="cursor-pointer"
              onClick={() => {
                setshow(false);
              }}
            />
            <div className="flex flex-col font-bold  ">
              {user == null ? (
                <>
                  <p className="p-5">
                    <Link to="/register">Register</Link>
                  </p>
                  <p className="p-5">
                    <Link to="/login">Login</Link>
                  </p>
                </>
              ) : null}
              <p className="p-5">
                <Link to="/profile/:id">Profile</Link>
              </p>
              <p className="p-5">
                <Link to="/write">Create New Post</Link>
              </p>
              <p className="p-5">
                <Link to="/profile/:id">My Blogs</Link>
              </p>
              <p className="p-5 cursor-pointer " onClick={handlelogout}>
                Logout
              </p>
            </div>
          </div>
          {loader && (
            <div
              className={`bg-[black] fixed w-full h-[100vh] top-0 left-0 opacity-[0.7] `}
            >
              <Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
}
