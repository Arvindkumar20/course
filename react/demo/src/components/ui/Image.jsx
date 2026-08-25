import defaultImage from "../../assets/hero.png";

export const Image = (props) => {
  return (
    <>
      <div>
        <img
          src={props.image || defaultImage}
          alt={props.alt || "Default image"}
          className={props.className || "w-full h-full object-contain"}
        />
      </div>
    </>
  );
};
