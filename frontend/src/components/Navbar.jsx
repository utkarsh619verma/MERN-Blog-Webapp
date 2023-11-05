import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import { usercontext } from "../Context/UserContext";
import { useContext, useState } from "react";

export function Navbar() {
  const { user } = useContext(usercontext);
  const [searchprompt, setPrompt] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex max-h-7 justify-between px-6 mt-6 md:px-[200px]  ">
      <div className="logo">
        <h1 className="font-extrabold text-lg md:text-xl ">
          <Link to="/">Blog Stop</Link>
        </h1>
      </div>
      <div className="flex items-center space-x-0 justify-center ">
        <p
          onClick={() =>
            navigate(searchprompt ? "?search=" + searchprompt : navigate("/"))
          }
        >
          <BsSearch />
        </p>
        <input
          type="search"
          className="outline-none px-3 "
          placeholder="Search for a post"
          name=""
          id=""
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
      </div>
      <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4 ">
        {user ? (
          <h3 className="">
            <Menu />
          </h3>
        ) : (
          <>
            {" "}
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          </>
        )}
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
    </div>
  );
}
