import { useCallback, useMemo, useState } from "react";
import { FaRegGrinTongue } from "react-icons/fa";
import ChildComponent from "./ChildComponent";

export const Hooks = () => {
  const [clicked, setClicked] = useState(0);
  const total = useMemo(() => {
    let sum = 0;
    for (let num = 0; num <= 1000000; num++) {
      sum += num;
    } //num=0+1
    //num=1+2||4+3=>
    //num=3+3||=>8+7;
    return sum;
  }, []);

  // function  clickBtn=useCallback(()=>{
  //   HTMLFrameElementge
  //   FaGoogleDrivegd
  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     getComputedStyles

  //     r
  //   }
  // })

  const clickBtn = useCallback((id) => {
    setClicked(id);
  }, []);
  
  //   const clickBtn = (id) => {
  //     setClicked(id);
  //     console.log(id);
  //   };

  console.log(clicked);
  return (
    <div className="">
      <p>{total}</p>

      <button onClick={() => clickBtn(2)}>Click</button>
      <p>Parent Id : {clicked}</p>
      <ChildComponent clickBtn={clickBtn} clicked={clicked} />
    </div>
  );
};
