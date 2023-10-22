import { Comments } from "../components/Comments";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export const PostDetails = () => {
  return (
    <>
      <Navbar />
      <div className="mt-12 md:px-[200px] px-8 ">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 Uses of Artifical Intelligence in Day to Day Life
          </h1>
          <div className="flex justify-center space-x-2 items-center">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-3 ">
          <p>@thunderbolt985</p>
          <div className="flex justify-center items-center space-x-2 ">
            <p>16/06/23</p>
            <p>16:45</p>
          </div>
        </div>
        <img
          className="w-full mt-4 mx-auto "
          src="https://www.teahub.io/photos/full/211-2113426_mikael-gustafsson-wallpaper-4k.jpg"
          alt=""
        />
        <p className="mt-8 text-xl mx-auto">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          saepe ea ex expedita delectus excepturi veritatis, iure illo ullam
          quod pariatur ipsam culpa voluptate eius dicta accusantium magnam
          quis, corporis exercitationem voluptatibus porro harum nobis id natus!
          Nemo, nobis architecto nihil, ducimus, laboriosam labore
          necessitatibus at recusandae quos provident omnis illum sapiente
          praesentium eius officiis. Suscipit accusamus iusto esse consequuntur
          iste corporis non distinctio, perspiciatis, deserunt ex quod alias
          necessitatibus, porro eos rerum incidunt nulla! Ratione cum excepturi
          iure officia!
        </p>
        <div className="flex mt-8 space-x-4 items-center ">
          <p className="font-bold">Categories:</p>
          <div className="flex justify-center items-center  space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">AI</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col ">
          <h3 className="font-bold mt-6 mb-4">Comments:</h3>
          <Comments />
          <Comments />
        </div>
        <div className="flex flex-col mt-4 md:flex-row ">
          <input
            type="text"
            name=""
            placeholder="Write a Comment"
            className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0 "
            id=""
          />
          <button className="bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0 ">
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
