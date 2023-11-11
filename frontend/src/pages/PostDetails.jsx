/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../url";
import { usercontext } from "../Context/UserContext";
import { Loader } from "../components/Loader";

export const PostDetails = () => {
  const postid = useParams().id;
  console.log(postid);
  const [post, setPost] = useState({});
  const { user } = useContext(usercontext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const fetchpost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/post/" + postid);
      setPost(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  useEffect(() => {
    fetchpost();
    fetchcomments();
  }, [postid]);
  const handlepostdelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/post/delete/" + postid, {
        withCredentials: true,
      });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchcomments = async () => {
    try {
      const commentsarray = await axios.get(
        URL + "/api/comment/post/" + postid
      );
      console.log(commentsarray);
      setComments(commentsarray.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addcomment = async () => {
    const commentdata = {
      comment: comment,
      author: user.username,
      postId: postid,
      userId: user._id,
    };
    console.log("asd");
    try {
      const postcomment = await axios.post(URL + "/api/comment", commentdata, {
        withCredentials: true,
      });
      console.log(postcomment);
      window.location.reload(true); //hard or forced reload of the page
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      {loader ? (
        <div className="w-full h-[20vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-12 md:px-[200px] px-8 ">
          <div className="flex justify-between items-center ">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user && user._id === post.userId ? (
              <>
                <div className="flex justify-center space-x-2 items-center">
                  <p
                    onClick={() => {
                      navigate("/edit/" + postid);
                    }}
                    className="cursor-pointer"
                  >
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handlepostdelete}>
                    <MdDelete />
                  </p>
                </div>
              </>
            ) : null}
          </div>
          <div className="flex justify-between mt-3 ">
            <p>
              <span className="italic text-gray-600 ">created by ~ </span>
              {post.username}
            </p>
            <div className="flex justify-center items-center space-x-2 ">
              <p>{new Date(post.updatedAt).toString().slice(0, 10)}</p>
              <p>{new Date(post.updatedAt).toString().slice(15, 21)}</p>
            </div>
          </div>
          <img className="w-full mt-4 mx-auto " src={post.photo} alt="" />
          <p className="mt-8 text-xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur saepe ea ex expedita delectus excepturi veritatis, iure
            illo ullam quod pariatur ipsam culpa voluptate eius dicta
            accusantium magnam quis, corporis exercitationem voluptatibus porro
            harum nobis id natus! Nemo, nobis architecto nihil, ducimus,
            laboriosam labore necessitatibus at recusandae quos provident omnis
            illum sapiente praesentium eius officiis. Suscipit accusamus iusto
            esse consequuntur iste corporis non distinctio, perspiciatis,
            deserunt ex quod alias necessitatibus, porro eos rerum incidunt
            nulla! Ratione cum excepturi iure officia!
          </p>
          <div className="flex mt-8 space-x-4 items-center ">
            <p className="font-bold">Categories:</p>
            <div className="flex justify-center items-center  space-x-2">
              {post.categories?.map((category, index) => (
                <>
                  <div key={index} className="bg-gray-300 rounded-lg px-3 py-1">
                    {category}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col ">
            <h3 className="font-bold mt-6 mb-4">Comments:</h3>
            {comments
              ? comments?.map((element) => (
                  <Comments key={element._id} c={element} post={post} />
                ))
              : null}
          </div>
          <div className="flex flex-col mt-4 md:flex-row ">
            <input
              type="text"
              name=""
              placeholder="Write a Comment"
              className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0 "
              id=""
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                addcomment();
              }}
              className="bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0 "
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
