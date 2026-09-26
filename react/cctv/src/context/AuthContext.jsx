import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jsession, setJsession] = useState("");
  const [name, setName] = useState("");


  const login = (data) => {
    localStorage.setItem("jsession", JSON.stringify(data));
    console.log(data);
    setJsession(data?.jsession);
    setName(data?.account_name);
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("jsession"));
    if (!authData) {
   console.log("object")
    } else {
      setJsession(authData?.jsession);
      setName(authData?.account_name);
    }
  }, [jsession, name]);

  return (
    <>
      <AuthContext.Provider value={{ jsession, name, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
