import { useContext, useEffect, useState } from "react";
import { Homeposts } from "../components/HomePosts";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
import axios from "axios";
import { URL } from "../../url";
import { Link, useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import { usercontext } from "../Context/UserContext";
export function Home() {
  const [posts, setpost] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(usercontext);
  const { search } = useLocation();
  console.log(search);
  console.log(user);
  const fetchpost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/post/" + search, {
        withCredentials: true,
      });
      setpost(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  useEffect(() => {
    fetchpost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="px-8 min-h-screen md:px-[200px]">
        {loader && (
          <div className="w-full h-[20vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
        {posts.length == 0 && !loader > 0 ? (
          <div className="h-[80vh] w-full flex justify-center items-center ">
            <h1 className="text-gray-400 text-6xl  ">No posts found</h1>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              to={user ? `/posts/post/${post._id}` : "/login"}
              key={post._id}
            >
              <Homeposts post={post} key={post._id} />
            </Link>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}
