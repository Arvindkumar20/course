// import { Image } from "../components/ui/Image";
// import defaultImage from "../assets/react.svg";
import { Button } from "../components/ui/Button";
export const UserList = () => {
  const handleOnClick = (id) => {
    console.log(id);
  };
  return (
    <>
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold text-center ">User List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 space-y-10 space-x-5">
          <Button onClick={handleOnClick}></Button>
          <Button
            className="bg-red-500 py-2 px-5 rounded-2xl text-white cursor-pointer"
            onClick={handleOnClick}
          >
            Submit
          </Button>
          <Button className="d" onClick={handleOnClick}>
            Add
          </Button>
          <Button onClick={handleOnClick}>21uygwedyewy</Button>
          {/* <Image image={defaultImage} alt={"This is an image"} className="w-full h-full object-contain" />
          <Image image={defaultImage} alt={"This is an image"}/>
          <Image />
          <Image />
          <Image /> */}
        </div>
      </section>
    </>
  );
};
