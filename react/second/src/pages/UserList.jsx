import React from "react";
import { userData } from "../data/usersList.js";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const handleClicke = (id, name, email) => {
    navigate(`/user/${id}/${name}/${email}`); //navigate to "/user/:id" url
  };

  
  return (
    <div>
      {userData?.map((user) => {
        return (
          <>
            <div onClick={() => handleClicke(user.id, user.name, user.email)}>
              <img src={user.profileImage} alt={user.name} />
              <h2>{user.email}</h2>
              <h3>{user.phone}</h3>
              <h2>{user.salary}</h2>
            </div>
          </>
        );
      })}
    </div>
  );
}
