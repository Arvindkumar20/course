export const Button = (props) => {
  return (
    <>
      <div>
        <button
          className={
            props.className ||
            "py-2 px-5 rounded-2xl cursor-pointer bg-blue-500 text-white"
          }
          onClick={() => props.onClick(props.children|| "Click me")}
        >
          {props.children || "Click me"}
        </button>
      </div>
    </>
  );
};
