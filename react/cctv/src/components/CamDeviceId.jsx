import axios from "axios";
import React, { Children, memo, useCallback, useEffect, useState } from "react";

function CamDeviceId({ children, className, setCamData }) {
  const [deviceIds, setDeviceIds] = useState([]);
  const loadCamDeviceIds = useCallback(async (children) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_getDeviceByVehicle.action?jsession=${"df16ebc919dd43b9a9f61ec51a38cb04"}&vehiIdno=${children}`,
      );
      console.log(res);
      setDeviceIds(res.data.devices);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCamDeviceIds(children);
  }, []);
  console.log(deviceIds);
  return (
    <div className={className}>
      <p className="text-xl font-bold">{children}</p>
      {deviceIds?.length > 0 &&
        deviceIds?.map((deviceId) => {
        //   deviceId.did &&
        //     setCamData((pre) => {
        //       return { ...pre,did: [...pre.did,deviceId.did] };
        //     });
          return <p className="text-xl font-bold">{deviceId.did}</p>;
        })}
    </div>
  );
}

export default memo(CamDeviceId);
