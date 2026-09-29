import axios from "axios";
import React, { Children, memo, useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Status from "./Status";
import { Link, useNavigate } from "react-router-dom";

function CamDeviceId({ children, className }) {
  const { jsession } = useAuth();
  const navigate=useNavigate();
  // console.log(children);
  const [deviceIds, setDeviceIds] = useState([]);
  const [CamData, setCamdata] = useState({
    vId: children,
  });
  const loadCamDeviceIds = useCallback(async (jsession, children) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_getDeviceByVehicle.action?jsession=${jsession}&vehiIdno=${children}`,
      );
      // console.log(res);
      setDeviceIds(res.data.devices);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCamDeviceIds(jsession, children);
  }, [children, jsession]);
  // console.log(deviceIds);
  return (
    <div className={className}>
      <p className="text-xl font-bold">{children}</p>
      {deviceIds?.length > 0 &&
        deviceIds?.map((deviceId) => {
          //   deviceId.did &&
          //     setCamData((pre) => {
          //       return { ...pre,did: [...pre.did,deviceId.did] };
          //     });
          return (
            // <Link to={`/camera-details/${children}/${deviceId.did}`}>
            <div className="cursor-pointer" onClick={()=>navigate("/camera-details",{state:CamData})}>
              <p className="text-xl font-bold">{deviceId.did}</p>
              <Status setCamData={setCamdata}>{deviceId.did}</Status>
            </div>
              
            // </Link>
          );
        })}
    </div>
  );
}

export default memo(CamDeviceId);
