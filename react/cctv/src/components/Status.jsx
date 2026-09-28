import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const getLocation = async (coords) => {
  try {
    const response = await fetch(
      `/api/nominatim/reverse?lat=${coords.lat}&lon=${coords.lon}&format=jsonv2&addressdetails=1`,
    );

    if (!response.ok) {
      throw new Error(`Location API error: ${response.status}`);
    }

    const data = await response.json();

    const address = data.address || {};

    return {
      latitude: Number(data.lat),
      longitude: Number(data.lon),

      houseNumber: address.house_number || null,
      street: address.road || null,

      area:
        address.neighbourhood ||
        address.suburb ||
        address.city_district ||
        null,

      city: address.city || address.town || address.village || null,

      district: address.county || null,
      state: address.state || null,
      pincode: address.postcode || null,
      country: address.country || null,

      fullAddress: data.display_name,

      googleMapsUrl: `https://www.google.com/maps?q=${data.lat},${data.lon}`,
    };
  } catch (error) {
    console.error("Location error:", error);
    return null;
  }
};

export default function Status({ children }) {
  const { jsession } = useAuth();
  console.log(children);
  const [online, setOnline] = useState(0);
  const [address, setAddress] = useState({});
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
      const addr = await getLocation({
        lat: res2.data.status[0].mlat,
        lon: res2.data.status[0].mlng,
      });
      setAddress(addr);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCamStatus(jsession, children);
  }, [children, jsession, loadCamStatus]);
  console.log(address);
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
