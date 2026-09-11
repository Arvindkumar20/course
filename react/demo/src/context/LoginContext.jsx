import { createContext, useState } from "react";
const LoginContext = createContext();

{
  /* <LoginProvider>jfhe rtg</LoginProvider>; */
}

export const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const storeInLocal=()=>{
    console.log("object")
  }

  return (
    <LoginContext.Provider value={{ email, password, setEmail, setPassword }}>
      {children}
    </LoginContext.Provider>
  );
};






