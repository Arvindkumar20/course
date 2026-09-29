import { useCallback, useState } from "react";

export const useLOcation = () => {
  const [fullAddress, setFullAddres] = useState({
    latitude: "",
    longitude: "",

    houseNumber: null,
    street: null,

    area: "",

    city: null,

    district: null,
    state: null,
    pincode: null,
    country: null,

    fullAddress: "",

    googleMapsUrl: "",
  });
  const getLocation = useCallback(async (coords) => {
    try {
      const response = await fetch(
        `/api/nominatim/reverse?lat=${coords.lat}&lon=${coords.lon}&format=jsonv2&addressdetails=1`,
      );

      if (!response.ok) {
        throw new Error(`Location API error: ${response.status}`);
      }

      const data = await response.json();

      const address = data.address || {};
      setFullAddres({
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
      });
    } catch (error) {
      console.error("Location error:", error);
      return null;
    }
  }, []);
  return { getLocation, fullAddress };
};
