import PropTypes from "prop-types";
export function Profileposts({ p }) {
  return (
    <div className="flex w-full space-x-2  mt-8">
      <div className="w-[35%] h-[200px] justify-center flex items-center mx-[2px]  ">
        <img className="h-full w-full object-cover" src={p?.photo} alt="" />
      </div>
      <div className="w-[65%]">
        <h1 className="text-xl font-bold md:text-2xl md:mb-2 mb-1">
          {p?.title}
        </h1>
        <div className="flex text-grey-500 font-semibold mb-2 md:mb-4 text-sm justify-between">
          <p>{p?.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p?.updatedAt).toString().slice(0, 10)}</p>
            <p>{new Date(p?.updatedAt).toString().slice(15, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{p?.description}</p>
      </div>
    </div>
  );
}
Profileposts.propTypes = {
  p: PropTypes.object.isRequired,
};
