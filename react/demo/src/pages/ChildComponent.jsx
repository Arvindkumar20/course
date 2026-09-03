import React from "react";

 function ChildComponent({ onClick, clicked }) {
    console.log(clicked)
//   clickBtn(6);
  return (
    <div>
      {/* <p>Child Id : {clicked}</p> */}
      <button onClick={() => onClick(3)}>Child click</button>
    </div>
  );
}

export default React.memo(ChildComponent);