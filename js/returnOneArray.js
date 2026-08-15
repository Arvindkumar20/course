export const retunOneArray = (newVehicleDlIdList, newVehicleNmList) => {
  return newVehicleDlIdList.map((item, index) => {
    //[{name:"",email:"dhw"}],[{salary:"yet23"}]
    return { ...newVehicleDlIdList[index], ...newVehicleNmList[index] };
  });
};
