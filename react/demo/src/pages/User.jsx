import { useParams } from "react-router-dom";
import { Image } from "../components/ui/Image";
import { userData } from "../data/userData.js";
import { useEffect, useState } from "react";
export const User = () => {
  const { id } = useParams(); //hook
  //   console.log(id);
  const [user, setUser] = useState({});

  useEffect(() => {
    const newUser = userData?.filter(
      (user) => user.id.toString() === id.toString(),
    )[0];
    setUser(newUser);
  }, []);
  console.log(user);
  return (
    <>
      <div className="container mx-auto border shadow-2xl bg-white w-[400px]">
        <Image
          image={user.profileImage}
          alt={user.name}
          className={"w-[400px] h-[400px] object-cover rounded"}
        />

        <div className="space-y-1 p-1">
          <h2 className="">Name : {user.name}</h2>
          <h2 className="">Email : {user.email}</h2>
          <h2 className="">Phone : {user.phone}</h2>
          {user.salary ? (
            <h2 className="">Salary : {user.salary}</h2>
          ) : (
            <p>No Salary</p>
          )}
        </div>
      </div>
    </>
  );
};
