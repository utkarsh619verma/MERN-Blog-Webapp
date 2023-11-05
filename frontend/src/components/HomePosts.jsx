import PropTypes from "prop-types";

export function Homeposts({ post }) {
  return (
    <div className="flex w-full space-x-2 cursor-pointer mt-8">
      <div className="w-[35%] h-[200px] justify-center flex items-center mx-[2px]  ">
        <img className="h-full w-full object-cover" src={post.photo} alt="" />
      </div>
      <div className="w-[65%]">
        <h1 className="text-xl font-bold md:text-2xl md:mb-2 mb-1">
          {post.title}
        </h1>
        <div className="flex text-grey-500 font-semibold mb-2 md:mb-4 text-sm justify-between">
          <p>{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.createdAt).toString().slice(0, 10)}</p>
            <p>{new Date(post.createdAt).toString().slice(15, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.description.slice(0, 200) + " Read More..."}
        </p>
      </div>
    </div>
  );
}

Homeposts.propTypes = {
  post: PropTypes.object,
};
