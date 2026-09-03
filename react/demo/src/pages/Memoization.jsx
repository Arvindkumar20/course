import React, { useCallback, useState } from "react";
import ChildComponent from "./ChildComponent";

export default function Memoization() {
  const [prentState, setParentState] = useState(0);
  const [ChildState, setChildState] = useState(1);

  const handleParentState = useCallback(() => {
    setParentState((pre) => pre + 1);
  }, []);
  const handleChildState = useCallback(() => {
    setChildState((pre) => pre + 1);
  }, []);

  return (
    <div>
      <button onClick={() => handleParentState(prentState)}>
        Parent State
      </button>
      <p>Parent State : {prentState}</p>
      <button onClick={() => handleChildState(ChildState)}>Child state</button>

      <p>Child State : {ChildState}</p>
      <ChildComponent onClick={handleChildState} clicked={prentState} />
    </div>
  );
}
