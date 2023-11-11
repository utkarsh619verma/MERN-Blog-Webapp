import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { usercontext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../../url";

export function Comments({ c, post }) {
  const { user } = useContext(usercontext);
  const deletecomment = async () => {
    try {
      const deleted = await axios.delete(URL + "/api/comment/" + c._id, {
        withCredentials: true,
      });
      console.log(deleted);
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
              <p>
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
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
}

Comments.propTypes = {
  c: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};
