import { Homeposts } from "../components/HomePosts";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
export function Home() {
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px]">
        <Homeposts />
        <Homeposts />
        <Homeposts />
        <Homeposts />
        <Homeposts />
        <Homeposts />
        <Homeposts />
      </div>
      <Footer />
    </>
  );
}
