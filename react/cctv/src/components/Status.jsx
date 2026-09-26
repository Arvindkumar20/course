import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Status({ children }) {
  const { jsession } = useAuth();
  console.log(children);
  const [online, setOnline] = useState(0);
  const loadCamStatus = useCallback(async (jsession, children) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_getDeviceOlStatus.action??jsession=${jsession}&devIdno=${children}`,
      );
      console.log(res);
      setOnline(res.data.onlines[0].online);
 
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCamStatus(jsession, children);
  }, [children, jsession]);

  return <div>{online == 1 ? "Online" : "Offline"}</div>;
}
