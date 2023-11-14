/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Profileposts } from "../components/ProfilePosts";
import { Footer } from "../components/footer";
import { usercontext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../../url";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user } = useContext(usercontext);
  const navigate = useNavigate();
  console.log(user?._id);
  const [post, setPosts] = useState([]);
  console.log(user?._id);

  const fetchpost = async () => {
    try {
      const posts = await axios.get(URL + "/api/post/user/" + user?._id);
      setPosts(posts.data);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchpost();
  }, [user?._id]);
  if (!user) {
    navigate("/login");
    return;
  }
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[180px] gap-5 mt-8 flex  flex-col-reverse md:items-start items-start">
        <div className="flex flex-col  w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          {post?.map((post) => (
            <Profileposts key={post?._id} p={post} />
          ))}
        </div>
        <div className=" md:top-12   flex justify-center md:justify-end items-start  w-full md:items-end ">
          <div className=" flex items-center flex-col w-full space-y-4 ">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <p className="w-[200px] h-[150px] flex items-center justify-center ">
              <FaUser className="w-full h-full" />
            </p>
            <p className="outline-none px-4 py-2 hover:text-black text-gray-500">
              {user?.username}
            </p>
            <p className="outline-none px-4 py-2 hover:text-black  text-gray-500">
              {user?.email}
            </p>
            {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}
            <div className="flex items-center space-x-4 mt-8">
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Edit Details
              </button>
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
