import { useParams } from "react-router-dom";
import { Image } from "../components/ui/Image";
import { userData } from "../data/userData.js";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
export const User = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { id } = useParams(); //hook
  //   console.log(id);
  const [user, setUser] = useState({}); //local state management
  //global
  //context api
  // redux  || redux toolkit
  //zustand

  useEffect(() => {
    const newUser = userData?.filter(
      (user) => user.id.toString() === id.toString(),
    )[0];
    setUser(newUser);
  }, [id]);

  // console.log(user);
  return (
    <div>
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
    </div>
  );
};
