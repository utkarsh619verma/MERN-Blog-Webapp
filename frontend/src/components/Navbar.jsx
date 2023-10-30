import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";

export function Navbar() {
  const user = false;
  return (
    <div className="flex max-h-7 justify-between px-6 mt-6 md:px-[200px]  ">
      <div className="logo">
        <h1 className="font-extrabold text-lg md:text-xl ">
          <Link to="/">Blog Stop</Link>
        </h1>
      </div>
      <div className="flex items-center space-x-0 justify-center ">
        <p>
          <BsSearch />
        </p>
        <input
          type="search"
          className="outline-none px-3 "
          placeholder="Search for a post"
          name=""
          id=""
        />
      </div>
      <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4 ">
        {user ? (
          <h3>
            <Link to="/write">Write a Post</Link>
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
