import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtedtecdRoute({children}) {
  const { jsession } = useAuth();

  return <Navigate replace={jsession ? "/" : "/login"} element={children}/>;
}
