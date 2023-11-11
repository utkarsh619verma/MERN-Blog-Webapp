/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url";
import { usercontext } from "../Context/UserContext";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const postid = useParams().id;
  const [cat, setcat] = useState("");
  const [category, addcat] = useState([]);
  const { user } = useContext(usercontext);
  const navigate = useNavigate();
  const addCategory = () => {
    // Create a copy of the category array and add the new category
    const updatedCats = [...category, cat];
    addcat(updatedCats);
    setcat("");
  };
  const fetchpost = async () => {
    try {
      const postdetails = await axios.get(URL + "/api/post/" + postid);
      setTitle(postdetails.data.title);
      setDesc(postdetails.data.description);
      setFile(postdetails.data.photo);
      setcat(postdetails.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const updatepost = async () => {
    const postdata = {
      title: title,
      description: desc,
      photo: null,
      username: user?.username,
      userid: user?.user_id,
      categories: category,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.img;
      data.append("file", file);
      data.append("img", filename);
      postdata.photo = data;

      try {
        const imgupload = await axios.post(URL + "/api/upload", data, {
          withCredentials: true,
        });
        console.log(imgupload);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(URL + "/api/post/" + postid, postdata, {
        withCredentials: true,
      });
      console.log(res);
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchpost();
  }, [postid]);
  return (
    <>
      <Navbar />
      <div className="md:px-[200px] px-6 mt-8  ">
        <h1 className="font-bold text-xl md:text-2xl mt-8 ">Edit the Post</h1>
        <form className="flex flex-col space-y-4 md:space-y-8 mt-4 " action="">
          <input
            type="text"
            name=""
            className="px-4 py-2 outline-none"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id=""
          />
          <input type="file" name="" className="px-4" id="" />
          <div className="flex flex-col">
            <div className="flex space-x-4 md:space-x-8 items-center ">
              <input
                className="px-4 py-2 outline-none"
                type="text"
                name=""
                placeholder="Enter post category"
                id=""
                onChange={(e) => {
                  setcat(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addCategory(); // Call the addCategory function
                }}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex px-4 mt-3">
              {category.map((element, ind) => {
                <div
                  key={ind}
                  className=" flex justify-center items-center bg-gray-200 px-2 py-1 rounded-md space-x-2 mr-4 "
                >
                  <p>{element}</p>
                  <p className="text-white bg-black rounded-full cursor-pointer p-1 text-sm">
                    <ImCross />
                  </p>
                </div>;
              })}
            </div>
          </div>
          <textarea
            rows={15}
            cols={31}
            className="px-4 py-2 outline outline-1 mt-3 ml-4  "
            placeholder="Enter post description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              updatepost();
            }}
            className="bg-black text-white   md:mx-auto md:w-[20%] font-semibold text-lg md:text-xl w-full px-4 py-4 mt-[30px]"
          >
            Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
