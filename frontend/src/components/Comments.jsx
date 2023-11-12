/* eslint-disable no-unused-vars */
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import { usercontext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../../url";

export function Comments({ c, post }) {
  const { user } = useContext(usercontext);
  const [comment, updatecomment] = useState(c.comment);
  const [editbutton, setEditButton] = useState(false);
  const inputref = useRef(null);
  const deletecomment = async () => {
    try {
      const deleted = await axios.delete(URL + "/api/comment/" + c._id, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };
  const editcomment = () => {
    if (inputref.current) {
      inputref.current.disabled = false;
      setEditButton(true);
      inputref.current.focus();
    }
  };
  const canceledit = () => {
    inputref.current.disabled = true;
    setEditButton(false);
    updatecomment(c.comment);
  };
  const uploadcomment = async () => {
    const commentdata = {
      comment: comment,
      author: user.username,
      postId: post._id,
      userId: user._id,
    };
    try {
      const updateresult = await axios.put(
        URL + "/api/comment/update/" + c._id,
        commentdata,
        { withCredentials: true }
      );
      console.log(updateresult.data);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(0, 15)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(16, 24)}
          </p>
          {user?._id == post?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  editcomment();
                }}
              >
                <BiEdit />
              </p>
              <p
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  deletecomment();
                }}
              >
                <MdDelete />
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-3 ">
        <input
          className="px-4  bg-gray-200 outline-none "
          type="text"
          name=""
          value={comment}
          disabled={true}
          ref={inputref}
          onChange={(e) => {
            updatecomment(e.target.value);
          }}
          id=""
        />
        {editbutton ? (
          <div className="flex flex-row space-x-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadcomment();
              }}
              className="bg-black cursor-pointer   text-[15px] w-[60px] h-[30px]  text-white rounded-md "
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                canceledit();
              }}
              className="bg-gray-400 cursor-pointer  text-[15px] w-[60px] h-[30px]  text-white rounded-md "
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

Comments.propTypes = {
  c: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};
