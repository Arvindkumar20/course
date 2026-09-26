import axios from "axios";
import React, { Children, memo, useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Status from "./Status";

function CamDeviceId({ children, className, setCamData }) {
  const { jsession } = useAuth();
  // console.log(children);
  const [deviceIds, setDeviceIds] = useState([]);
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
            <>
              <p className="text-xl font-bold">{deviceId.did}</p>
              <Status>{deviceId.did}</Status>
            </>
          );
        })}
    </div>
  );
}

export default memo(CamDeviceId);
