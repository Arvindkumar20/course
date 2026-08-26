import defaultImage from "../../assets/hero.png";

export const Image = ({image,alt,className}) => {
  return (
    <>
      <div>
        <img
          src={image || defaultImage}
          alt={alt || "Default image"}
          className={className || "w-full h-full object-contain"}
        />
      </div>
    </>
  );
};

// export const ProfileImage=()=>{
//   return <>
//   <div>
//     <img src="" alt="" />
//   </div>
//   </>
// }
