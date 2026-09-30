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
    startDate: "2026-09-29 00:00:01",
    endDate: "2026-09-29 19:59:00",
    distance: 0,
    parkTime: 0,
    pageRecords: 10,
    index: 1,
  });

  // console.log(pagination);
  //   const { jsession } = useAuth();
  const location = useLocation();
  //   const navigate = useNavigate();
  // http://chinamdvr.com:8088/StandardApiAction_queryTrackDetail.action?jsession=cf6b70a3-c82b-4392-8ab6-bbddce336222&devIdno=500000&begintime=2015-12-25 00:00:00&endtime=2015-12-30 23:59:59&distance=0&parkTime=0&currentPage=1&pageRecords=50&toMap=1
  // console.log(location);
  const loadData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_queryTrackDetail.action?jsession=${jsession}&devIdno=${location?.state?.did}&begintime=${pagination.startDate}&endtime=${pagination.endDate}&distance=${pagination.distance}&parkTime=${pagination.parkTime}&currentPage=${pagination.currentPage}&pageRecords=${pagination.pageRecords}&toMap=1`,
      );
      console.log(res);
      setVMicroInfo(res.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = loadData();
  }, [jsession, pagination]);
  const getAddres = (lat, lon) => {
    getLocation({ lat: lat, lon: lon });
    return fullAddress.fullAddress;
  };
  // console.log(fullAddress);
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

          <div className="p-5 bg-white shadow-2xl rounded-2xl flex items-center justify-start flex-wrap gap-5 ">
            <input
              type="text"
              placeholder="Enter your distance"
              className="py-2 px-3 border rounded outline-none"
              onChange={(e) =>
                setPagination((pre) => {
                  return { ...pre, distance: e.target.value };
                })
              }
            />

             <input
              type="text"
              placeholder="Enter your parkTime"
              className="py-2 px-3 border rounded outline-none"
              onChange={(e) =>
                setPagination((pre) => {
                  return { ...pre, parkTime: e.target.value };
                })
              }
            />

               <input
              type="text"
              placeholder="Enter your items per page"
              className="py-2 px-3 border rounded outline-none"
              onChange={(e) =>
                setPagination((pre) => {
                  return { ...pre, pageRecords: e.target.value };
                })
              }
            />
          </div>
          <table className="overflow-x-scroll">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Time</th>
                <th>Distance</th>
                <th>Parking Time</th>
                <th>lat</th>
                <th>lon</th>
                <th>location</th>
                <th>Open with map</th>
              </tr>
            </thead>
            <tbody>
              {vMicroInfo?.map((vInfo, index) => {
                return (
                  <tr className="border">
                    <td className="p-5 border border-red-500">
                      {pagination.index + index}
                    </td>
                    <td className="p-5 border border-red-500">{vInfo.gt}</td>
                    <td className="p-5 border border-red-500">{vInfo.dst}</td>
                    <td className="p-5 border border-red-500">{vInfo.pk}</td>
                    <td className="p-5 border border-red-500">{vInfo.mlat}</td>
                    <td className="p-5 border border-red-500">{vInfo.mlng}</td>
                    <td className="p-5 border border-red-500">
                      {getAddres(vInfo.mlat, vInfo.mlng)}
                    </td>

                    <td className="p-5 border border-red-500">
                      <button className="py-2 px-3 border rounded w-[200px]">
                        <a
                          href={`https://www.google.com/maps?q=${vInfo.mlat},${vInfo.mlng}`}
                        >
                          Open On Map
                        </a>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between ">
            <button
              className="py-2 px-3 border rounded cursor-pointer w-28"
              onClick={() =>
                setPagination((pre) => {
                  return {
                    ...pre,
                    currentPage: pre.currentPage - 1,
                    index: pre.index <= 10 ? 1 : pre.index - 10,
                  };
                })
              }
            >
              Pre
            </button>
            <button
              className="py-2 px-3 border rounded cursor-pointer w-28"
              onClick={() => {
                setPagination((pre) => {
                  return {
                    ...pre,
                    currentPage: pre.currentPage + 1,
                    index: pre.index <= 10 ? 11 : pre.index + 10,
                  };
                });
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
