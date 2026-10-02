import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLOcation } from "../utils/useLocation";
import { alarmType } from "../utils/getAlarmType";

export default function VehicleAlarmHistory() {
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
  const location = useLocation();
  const loadData = async () => {
    try {
      // http://chinamdvr.com:8088/StandardApiAction_queryAlarmDetail.action?jsession=cf6b70a3-c82b-4392-8ab6-bbddce336222&devIdno=500000&begintime=2015-12-25 00:00:00&endtime=2015-12-30 23:59:59&armType=2,9,11&handle=0&currentPage=1&pageRecords=50&toMap=2
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_queryAlarmDetail.action?jsession=${jsession}&devIdno=${location?.state?.did}&begintime=${pagination.startDate}&endtime=${pagination.endDate}&armType=206&handle=0&currentPage=${pagination.currentPage}&pageRecords=${pagination.pageRecords}&toMap=2`,
      );
      console.log(res);
      setVMicroInfo(res.data.alarms);
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
                <th>Start Date</th>
                <th>Start Time</th>
                <th>end Date</th>
                <th>end Time</th>
                <th>Alarm Type</th>
                <th>Total Meliage</th>
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
                    <td className="p-5 border border-red-500">
                      {vInfo.bTimeStr.split(" ")[0]}
                    </td>
                    <td className="p-5 border border-red-500">
                      {vInfo.bTimeStr.split(" ")[1]}
                    </td>

                    <td className="p-5 border border-red-500">
                      {vInfo.eTimeStr.split(" ")[0]}
                    </td>
                    <td className="p-5 border border-red-500">
                      {vInfo.eTimeStr.split(" ")[1]}
                    </td>

                    <td className="p-5 border border-red-500">
                      {alarmType[vInfo.atp]}
                    </td>

                    <td className="p-5 border border-red-500">
                      <span>{vInfo.slc / 1000} KM</span>
                    </td>
                    <td className="p-5 border border-red-500">{vInfo.emlat}</td>
                    <td className="p-5 border border-red-500">{vInfo.emlng}</td>
                    <td className="p-5 border border-red-500">
                      {getAddres(vInfo.emlat, vInfo.emlng)}
                    </td>

                    <td className="p-5 border border-red-500">
                      <button className="py-2 px-3 border rounded w-[200px]">
                        <a
                          href={`https://www.google.com/maps?q=${vInfo.emlat},${vInfo.emlng}`}
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
                    index:
                      pre.index <= 10
                        ? 11
                        : vMicroInfo.length >= pre.index + 10
                          ? pre.index + 10
                          : pre.index,
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
