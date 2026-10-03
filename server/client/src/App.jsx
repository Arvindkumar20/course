import { useState } from "react";

import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const loadUserData = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const result = await res.json();
    console.log(result.users);
    setUsers(result.users);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      {users?.map((user) => {
        return (
          <div key={user._id}>
            <h1>{user._id}</h1>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
        );
      })}
    </>
  );
}

export default App;
