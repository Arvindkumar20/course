import React from "react";
import { userData } from "../data/usersList.js";

export default function UserList() {

const handleClicke=(id)=>{
    console.log(id)
    
}

  return (
    <div>
      {userData?.map((user) => {
        return (
          <>
            <div onClick={()=>handleClicke(user.id)}>
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
