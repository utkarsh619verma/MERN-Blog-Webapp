import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Menu() {
  const [show, setshow] = useState(false);
  return (
    <div>
      <FaBars
        onClick={() => {
          setshow(true);
        }}
      />

      {show && (
        <>
          <div
            className={`bg-[black] fixed w-[100%] h-[100vh] top-0 left-0 opacity-[0.7] `}
          ></div>
          <div
            className={`fixed h-[100vh]  w-[50vw] py-[20px] space-y-8 px-[50px] bg-slate-200  right-${
              show ? `0` : `[-206px]`
            } top-0`}
          >
            <FaBars
              onClick={() => {
                setshow(false);
              }}
            />
            <div className="flex flex-col font-bold  ">
              <p className="p-5">
                <Link to="/register">Register</Link>
              </p>
              <p className="p-5">
                <Link to="/login">Login</Link>
              </p>
              <p className="p-5">
                <Link to="/profile/:id">Profile</Link>
              </p>
              <p className="p-5">
                <Link to="/write">Write</Link>
              </p>
              <p className="p-5">
                <Link to="/profile/:id">My Blogs</Link>
              </p>
              <p className="p-5">
                <Link to="/">Logout</Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
