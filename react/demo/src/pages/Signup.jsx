import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Signup({className}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   // const key = e.target.name;
  //   setFormData((pre) => {
  //     return {
  //       ...pre,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   let user=await signup({name,email,password})
    // } catch (error) {
    //   console.log(error)
    // }
    console.log(name, email, password);
    setName("");
    setEmail("");
    setPassword("");

    // console.log(formData);
    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <div className={className}>
      <div className=" container mx-auto flex flex-col items-center justify-center h-screen">
        <div className="p-10 bg-white shadow-2xl w-[400px] space-y-5">
          <h2 className="text-center font-bold">Welcome back</h2>
          <form className="grid space-y-5" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              id=""
              value={name}
              // value={formData.name}
              className="border py-1 px-2"
              placeholder="enter your name"
              onChange={handleNameChange}
              // onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id=""
              value={email}
              // value={formData.email}
              className="border py-1 px-2"
              placeholder="enter your email"
              onChange={handleEmailChange}
              // onChange={handleChange}
            />
            <div className="flex items-center justify-between gap-2 border py-1 px-2">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id=""
                value={password}
                // value={formData.password}
                className=" pr-2 w-full outline-none "
                placeholder="enter your password"
                onChange={handlePasswordChange}
                // onChange={handleChange}
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={handlePasswordVisibility}
              >
                {/* <button type="button" onClick={()=>setIsPasswordVisible(!isPasswordVisible)}> */}
                {/* {isPasswordVisible ? "hide" : "show"} */}
                {isPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <button className="bg-blue-500 rounded-2xl text-white cursor-pointer w-2/3 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
