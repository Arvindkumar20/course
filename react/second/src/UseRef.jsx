import React, { useRef, useState } from "react";


export default function UseRef() {












  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(); //{curent:}

  //   for video
  const handlePlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };


  const handleMutaion = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // for image
  const imageRef = useRef(); 
  const [image, setImage] = useState();


  const handleImageUpload = () => {
    imageRef.current.click();
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
   console.log(imageFile)
      setImage(URL.createObjectURL(imageFile));
  };
    console.log(image);

  return (
    // for video 
    <div>
      <video
        src="/output2.mp4"
        className="h-[500px] w-[200px]"
        ref={videoRef}
        controls
      ></video>

      <button onClick={handlePlay} className="py-2 px-5 bg-blue-500">
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button onClick={handleMutaion} className="py-2 px-5 bg-red-500">
        {isMuted ? "unmute" : "mute"}
      </button>




      {/* for image */}

      <div className="bg-gray-300 text-black py-20 container mx-auto px-20">
        <input
          type="file"
          ref={imageRef}
          className="hidden"
          onChange={handleImageChange}
        />

        <div
          className="cursor-pointer h-[200px] w-[200px] rounded-2xl text-center border flex items-center justify-center"
          onClick={handleImageUpload}
        >
          {!image ? (
            <button className="">UploadImage</button>
          ) : (
            <img
              src={image}
              alt="Uploaded image"
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
