import React, { memo, useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLOcation } from "../utils/useLocation";



 function Status({ children, setCamData }) {
  const { jsession } = useAuth();
  const {fullAddress:addr,getLocation}=useLOcation();
  // console.log(children);
  const [online, setOnline] = useState(0);
  const [address, setAddress] = useState(addr);
  const [quards, setQuards] = useState({
    lat: "",
    lng: "",
  });

  // http://chinamdvr.com:8088/StandardApiAction_getDeviceStatus.action?jsession=cf6b70a3-c82b-4392-8ab6-bbddce336222&devIdno=500000&toMap=1&language=zh
  const loadCamStatus = useCallback(async (jsession, children) => {
    try {
      const res1 = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_getDeviceOlStatus.action??jsession=${jsession}&devIdno=${children}`,
      );
      const res2 = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_getDeviceStatus.action??jsession=${jsession}&devIdno=${children}&toMap=1&language=zh`,
      );
      setOnline(res1.data.onlines[0].online);
      setQuards({
        lat: res2.data.status[0].mlat,
        lng: res2.data.status[0].mlng,
      });
     await getLocation({
        lat: res2.data.status[0].mlat,
        lon: res2.data.status[0].mlng,
      });
      setCamData((pre) => {
        return {
          ...pre,
          address: addr,
          status: res1.data.onlines[0].online,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setAddress(addr);
    setCamData((pre) => {
      return { ...pre, did: children };
    });
  },[addr, children, setCamData]);
  useEffect(() => {
    loadCamStatus(jsession, children);
  }, [children, jsession, loadCamStatus]);
  // console.log(address);
  return (
    <>
      <div>{online == 1 ? "Online" : "Offline"}</div>
      <div className="grid space-y-2">
        <address className="">{address.fullAddress}</address>
        <button className="py-2 px-3 border rounded">
          <a href={address.googleMapsUrl}>Open On Map</a>
        </button>
      </div>
    </>
  );
}

export default memo(Status);