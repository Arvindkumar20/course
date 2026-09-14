import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { userData } from "../data/usersList.js";

export default function UserPage() {
  const { id, name, email } = useParams();

  const user = useMemo(
    () => userData.filter((user) => user.id === Number(id))[0],
    [id],
  );

  // console.log(user);
  return (
    <div>
      <div>
        <img src={user.profileImage} alt={user.name} />
        <h2>{user.email}</h2>
        <h3>{user.phone}</h3>
        <h2>{user.salary}</h2>
      </div>
    </div>
  );
}
