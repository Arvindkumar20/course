import { listData } from "./data.js";
import { retunOneArray } from "./returnOneArray.js";

const newVehicleNmList = listData.vehicles.reduce((acc, vehicle) => {
  acc.push({ nm: vehicle.nm });
  return acc;
}, []); //[{nm:"iodiwe"},{nm:"isywiq7y"}]

let newVehicleDlIdList = listData.vehicles.map((vehicle) => {
  return vehicle.dl.reduce((acc, dl) => {
    acc = { id: dl.id };
    return acc;
  }, {});
});

let newVehicleList = retunOneArray(newVehicleDlIdList, newVehicleNmList);
console.log(newVehicleList);
