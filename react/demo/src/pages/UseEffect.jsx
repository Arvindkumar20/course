import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UseEffect = ({ user }) => {
  const [counter, setCounter] = useState(0);

  const [withoutCounter, setWithoutCounter] = useState(true);

  // counter=1;

  const handleClick = () => {
    setCounter((prevois) => prevois + 1);
    // setCounter((pre) => pre + 1);
    // setCounter((pre) => pre + 1);
    // setCounter((pre) => pre + 1);
    // setCounter((pre) => pre + 1);
    // setCounter((pre) => pre + 1);
    // setCounter((pre) => pre + 1);
  };

  useEffect(() => {
    setWithoutCounter(!withoutCounter);
  }, [counter]);

  useEffect(() => {
    console.log("object");
  },[]);


  return (
    <div className="grid">
      {counter && <p>{counter}</p>}
      <button onClick={handleClick}>Count</button>
      {withoutCounter && (
        <p className="text-red-500"> withoutCounter : {withoutCounter}</p>
      )}

      <Link to={"/dashboard"}> Dashboard</Link>
    </div>
  );
};
