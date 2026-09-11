import React, { useEffect, useRef } from "react";

export default function UseRefHook() {
  const inputRef = useRef(); //{current:}
  const videoRef = useRef(); //{current:}

  const handleSearch = () => {
    inputRef.current.focus();
  };

  const handlePlay = () => {
    videoRef.current.play();
    console.log(videoRef.current);
  };
  const handlePause = () => {
    videoRef.current.pause();
  };

//   const handleVideo = () => {
//     if (videoRef.current.play()) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
//   };

  return (
    <div>
      <input type="text" ref={inputRef} className="border" />
      <button onClick={handleSearch}>Search</button>
      {/* <video className="h-20 w-20">
        <source src="https://youtu.be/6OmqsFrRv4I" />
      </video> */}
      <video
        src="https://www.w3schools.com/tags/mov_bbb.mp4"
        ref={videoRef}
      ></video>

      <div className="grid">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pouse</button>
        {/* <button onClick={handleVideo}>
          {videoRef?.current?.play() ? "Pause" : "Play"}
        </button> */}
      </div>
    </div>
  );
}
