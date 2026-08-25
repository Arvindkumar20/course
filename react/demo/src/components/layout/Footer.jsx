export const Footer = ({message}) => {
  return (
    <>
      <div className="bg-black text-white py-5">
        <footer className="container mx-auto  flex items-center justify-between">
          <div>logo</div>
          <div>menu items</div>
          <div>contact detail</div>
          <p>{message}</p>
        </footer>
      </div>
    </>
  );
};
