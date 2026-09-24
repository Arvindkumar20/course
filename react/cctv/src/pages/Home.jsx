import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CamDeviceId from "../components/CamDeviceId";

export default function Home() {
  const [isLoding, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //   const [succseMsg, setSuccessMsg] = useState("");
  const [vehiclesData, setVehiclesData] = useState([]);
  const [camData,setCamData]=useState({nm:[],did:[]});

  const handleVehiclesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_queryUserVehicle.action?jsession=${"df16ebc919dd43b9a9f61ec51a38cb04"}&language=zh`,
      );
      console.log(res);

      setVehiclesData(res.data.vehicles);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleVehiclesData();
  }, []);

console.log(camData)
  console.log(errorMsg);
  if (errorMsg != "") {
    return <p className="text-black-500 text-center">Data not Found</p>;
  }

  return (
    <div className="container mx-auto">
      <ul className="flex items-center justify-between gap-5">
        {vehiclesData.length > 0 ? (
          vehiclesData.map((vehicle) => {
            return (
              <li
                key={vehicle.id}
                className="p-10 shadow-2xl border rounded-2xl "
              >
                {vehicle.nm && (
                  <CamDeviceId className="" setCamData={setCamData}> {vehicle.nm}</CamDeviceId>
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
