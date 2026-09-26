import axios from "axios";
import React, { useEffect, useState } from "react";
import CamDeviceId from "../components/CamDeviceId";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isLoding, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { jsession } = useAuth();
  // console.log(jsession);
  //   const [succseMsg, setSuccessMsg] = useState("");
  const [vehiclesData, setVehiclesData] = useState([]);
  const [camData, setCamData] = useState({ nm: [], did: [] });
  const navigate = useNavigate();
  const handleVehiclesData = async (token) => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_queryUserVehicle.action?jsession=${token}&language=zh`,
      );
      // console.log(res);
      setVehiclesData(res.data.vehicles);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jsession) {
      handleVehiclesData(jsession);
    } else {
      navigate("/login");
    }
  }, [jsession]);

  // console.log(camData);
  // console.log(errorMsg);
  if (errorMsg != "") {
    return <p className="text-black-500 text-center my-20">Data not Found</p>;
  }

  if (isLoding) {
    return <p className="texttext-black-500 text-center my-20">Loadding...</p>;
  }
  return (
    <div className="container mx-auto my-20">
      <ul className="flex items-center justify-between gap-5">
        {vehiclesData?.length > 0 ? (
          vehiclesData?.map((vehicle) => {
            return (
              <li
                key={vehicle.id}
                className="p-10 shadow-2xl border rounded-2xl "
              >
                {vehicle.nm && (
                  <CamDeviceId className="" setCamData={setCamData}>
                
                    {vehicle.nm}
                  </CamDeviceId>
                )}
              </li>
            );
          })
        ) : (
          <p className="text-black-500 text-center">Data not Found</p>
        )}
      </ul>
    </div>
  );
}
