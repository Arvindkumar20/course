import axios from "axios";
import React, { Children, memo, useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Status from "./Status";
import { Link, useNavigate } from "react-router-dom";

function CamDeviceId({ children, className }) {
  const { jsession } = useAuth();
  const navigate = useNavigate();
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
            <div className="grid space-y-4">
              <div className="cursor-pointer">
                <p className="text-xl font-bold">{deviceId.did}</p>
                <Status setCamData={setCamdata}>{deviceId.did}</Status>
              </div>
              {/* <div className="flex items-center justify-between flex-wrap"> */}
              <button
                className="py-2 px-3 border rounded bg-blue-500 text-white cursor-pointer "
                onClick={() => navigate("/camera-details", { state: CamData })}
              >
                View in Detail
              </button>
              <button
                className="py-2 px-3 border rounded bg-green-500 text-white cursor-pointer "
                onClick={() =>
                  navigate("/vehicle-alarm-history", { state: CamData })
                }
              >
                View Alarms History{" "}
              </button>
              <button
                className="py-2 px-3 border rounded bg-slate-500 text-white cursor-pointer"
                onClick={() =>
                  navigate("/vehicle-real-time-alarm", { state: CamData })
                }
              >
                View Real Time Alarm{" "}
              </button>
              <button
                className="py-2 px-3 border rounded bg-green-500 text-white cursor-pointer"
                onClick={() => navigate("/vehicle-meliage", { state: CamData })}
              >
                View Meliage{" "}
              </button>
              <button
                className="py-2 px-3 border rounded bg-green-500 text-white cursor-pointer"
                onClick={() => navigate("/vehicle-parking", { state: CamData })}
              >
                View Parking{" "}
              </button>
              <button
                className="py-2 px-3 border rounded bg-green-500 text-white cursor-pointer"
                onClick={() =>
                  navigate("/vehicle-latets-loaction", { state: CamData })
                }
              >
                Latest locations{" "}
              </button>
              <button
                className="py-2 px-3 border rounded bg-green-500 text-white cursor-pointer"
                onClick={() =>
                  navigate("/vehicle-meliage-details", { state: CamData })
                }
              >
                View Meliage Details{" "}
              </button>
              <button
                className="py-2 px-3 border rounded bg-green-500 text-white cursor-pointer"
                onClick={() =>
                  navigate("/vehicle-access-area", { state: CamData })
                }
              >
                View access area{" "}
              </button>
            </div>
            // </div>

            // </Link>
          );
        })}
    </div>
  );
}

export default memo(CamDeviceId);
