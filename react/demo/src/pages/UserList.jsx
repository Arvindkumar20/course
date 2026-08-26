// import { Image } from "../components/ui/Image";
// import defaultImage from "../assets/react.svg";

import { useNavigate } from "react-router-dom";
import { Image } from "../components/ui/Image.jsx";
import { userData } from "../data/userData.js";
// import { Button } from "../components/ui/Button";

export const UserList = () => {
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold text-center ">User List</h2>
        <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 inset-0 my-10 ">
          {userData?.length > 0 ? (
            userData?.map((user) => {
              // if (user.name.toLocaleLowerCase().trim() === "raj") return null;
              return (
                <li
                  key={user.id}
                  style={{
                    color: "black",
                    background:
                      user.id % 2 === 0
                        ? "rgb(165, 234, 165)"
                        : "rgb(244, 159, 159)",
                  }}
                  className="flex items-center justify-center gap-5 rounded shadow-2xl  border h-full p-3"
                  onClick={() => handleOnClick(user.id)}
                  onTouchMove={() => handleOnClick(user.id)}
                >
                  <Image
                    image={user.profileImage}
                    alt={user?.name}
                    className={"w-28 h-28 object-cover rounded-full"}
                  />
                  <div className="space-y-1">
                    <h2 className="">Name : {user.name}</h2>
                    <h2 className="">Email : {user.email}</h2>
                    <h2 className="">Phone : {user.phone}</h2>
                    {user.salary ? (
                      <h2 className="">Salary : {user.salary}</h2>
                    ) : (
                      <p>No Salary</p>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="flex items-center justify-center   w-full">
              <p className="text-center"> No user data</p>
            </div>
          )}
        </ul>
      </section>
    </>
  );
};
