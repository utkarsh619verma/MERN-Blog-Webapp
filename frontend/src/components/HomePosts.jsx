export function Homeposts() {
  return (
    <div className="flex w-full space-x-2  mt-8">
      <div className="w-[35%] h-[200px] justify-center flex items-center mx-[2px]  ">
        <img
          className="h-full w-full object-cover"
          src="https://www.teahub.io/photos/full/211-2113426_mikael-gustafsson-wallpaper-4k.jpg"
          alt=""
        />
      </div>
      <div className="w-[65%]">
        <h1 className="text-xl font-bold md:text-2xl md:mb-2 mb-1">
          10 Places to Visit this summer
        </h1>
        <div className="flex text-grey-500 font-semibold mb-2 md:mb-4 text-sm justify-between">
          <p>@unknown_user</p>
          <div className="flex space-x-2">
            <p>12/04/2023</p>
            <p>10:23</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A soluta
          maiores, aliquid eius libero, non beatae impedit vero molestias dolore
          aperiam enim sequi aliquam dolor laborum voluptatum ipsa iure, ullam
          iste qui! Nostrum blanditiis asperiores eveniet amet hic ipsum aperiam
          impedit, esse quas provident delectus excepturi, consectetur incidunt
          neque, dolorum aut voluptas recusandae voluptatum totam ipsa. Cumque
          doloremque vitae autem?
        </p>
      </div>
    </div>
  );
}
