import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLOcation } from "../utils/useLocation";

export default function CameraDetails() {
  const { fullAddress, getLocation } = useLOcation();
  const { jsession } = useAuth();
  const [vMicroInfo, setVMicroInfo] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    endRecord: 50,
    startDate: "2026-09-29 00:00:01",
    endDate: "2026-09-29 19:59:00",
    distance: 0,
    parkTime: 0,
    pageRecords: 50,
  });
  console.log(pagination);
  //   const { jsession } = useAuth();
  const location = useLocation();
  //   const navigate = useNavigate();
  // http://chinamdvr.com:8088/StandardApiAction_queryTrackDetail.action?jsession=cf6b70a3-c82b-4392-8ab6-bbddce336222&devIdno=500000&begintime=2015-12-25 00:00:00&endtime=2015-12-30 23:59:59&distance=0&parkTime=0&currentPage=1&pageRecords=50&toMap=1
  console.log(location);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_queryTrackDetail.action?jsession=${jsession}&devIdno=${location.state.did}&begintime=${pagination.startDate}&endtime=${pagination.endDate}&distance=${pagination.distance}&parkTime=${pagination.parkTime}&currentPage=${pagination.currentPage}&pageRecords=${pagination.pageRecords}&toMap=1`,
      );
      console.log(res);
      setVMicroInfo(res.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = loadData();
    // console.log(data);
  }, [jsession]);

  const getAddres = (lat, lon) => {
    getLocation({ lat: lat, lon: lon });
    return fullAddress.fullAddress;
  };
console.log(fullAddress)
  return (
    <div className="flex items-center justify-center mx-auto my-20">
      <div>
        <h2 className="text-xl font-bold">{location?.state?.vId}</h2>
        <h3 className="text-lg font-bold">{location?.state?.did}</h3>
        <div>{location?.state?.status == 1 ? "Online" : "Offline"}</div>
        <div className="grid space-y-2">
          <address className="">
            {location?.state?.address?.fullAddress}
          </address>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>lat</th>
                <th>lon</th>
                <th>location</th>
                <th>Open with map</th>
              </tr>
              <tbody>
                {vMicroInfo?.map((vInfo) => {
                  return (
                    <tr>
                      <td>{vInfo.gt}</td>
                      <td>{vInfo.mlat}</td>
                      <td>{vInfo.mlng}</td>
                      <td>{getAddres(vInfo.mlat,vInfo.mlng)}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </thead>
          </table>
          {/* <button className="py-2 px-3 border rounded w-[200px]">
            <a href={location?.state?.address?.googleMapsUrl}>Open On Map</a>
          </button> */}
        </div>
      </div>
    </div>
  );
}
