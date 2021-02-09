//import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

//Dashboard
export const getDashboard = () => {
  return httpClient.get(server.DASHBOARD_URL);
};

//Customer
export const getListcustomertypeselector = () => {
  return httpClient.get(server.CUSTOMERTYPESELECTOR_URL);
};
export const getListallcustomers = () => {
  return httpClient.get(server.LISTALLCUSTOMERS_URL);
};

export const getListEditcustomers = (data) => {
  return httpClient.post(server.LIST_CUSTOMER_EDIT_URL, data);
};

export const addNewpersonnal = (data) => {
  return httpClient.post(server.NEWCUSTOMER_URL, data);
};

export const putEditcustomer = (data) => {
  return httpClient.put(server.EDIT_CUSTOMER_URL, data);
};

export const delCustomer = (data) => {
  return httpClient.put(server.DELETE_CUSTOMER_URL, data);
};

//GetProvince
export const getProvinces = () => {
  return httpClient.post(server.LIST_FIND_PROVINCE_URL);
};

//GetAMPHOE
export const getAmphoe = (data) => {
  return httpClient.post(server.LIST_FIND_AMPHOE_URL,data);
};

//GetProvince
export const getDistrict = (data) => {
  return httpClient.post(server.LIST_FIND_DISTRICT_URL,data);
};

//Quotation





//Equipment
export const getEquipment = () => {
  return httpClient.get(server.LIST_ALL_EQUIPMENT_URL);
};

export const getEditequipment = (data) => {
  return httpClient.post(server.LIST_EDIT_EQUIPMENT_URL,data);
};

export const addEquipment = (data) => {
  return httpClient.post(server.ADD_EQUIPMENT_URL,data);
};

export const editEquipment = (data) => {
  return httpClient.put(server.PUT_EDIT_EQUIPMENT_URL,data);
};

export const delEquipment = (data) => {
  return httpClient.put(server.DELETE_EQUIPMENT_URL,data);
};

//Equipment SET
export const getSetEquipment = () => {
  return httpClient.get(server.LIST_ALL_SET_EQUIPMENT_URL);
};
export const getSetEquipmentmini = () => {
  return httpClient.get(server.LIST_ALL_SET_MINI_EQUIPMENT_URL);
};



// export const addSetEquipment = (data) => {
//   return httpClient.post(server.ADD_SET_EQUIPMENT_URL,data);
// };

export const editSetEquipment = (data) => {
  return httpClient.put(server.PUT_EDIT_SET_EQUIPMENT_URL,data);
};

export const delSetEquipment = (data) => {
  return httpClient.put(server.DELETE_SET_EQUIPMENT_URL,data);
};

//Package
export const getPackage = () => {
  return httpClient.get(server.LIST_ALL_PACKAGE_URL);
};

export const getlistEquipmentToPackage = () => {
  return httpClient.get(server.LIST_ALL_Equipments_PackageUse_URL);
};

export const addPackage = (data) => {
  return httpClient.post(server.ADD_PACKAGE_URL,data);
};

export const getEditPackage = (data) => {
  return httpClient.post(server.LIST_EDIT_PACKAGE_URL,data);
};

export const editPackage = (data) => {
  return httpClient.put(server.PUT_EDIT_PACKAGE_URL,data);
};

export const delPackage = (data) => {
  return httpClient.put(server.DELETE_PACKAGE_URL,data);
};


//Promotion

export const getPromotion = () => {
  return httpClient.get(server.LIST_ALL_PROMOTION_URL);
};

export const getEditpromotion = (data) => {
  return httpClient.post(server.LIST_EDIT_PROMOTION_URL,data);
};

export const addPromotion = (data) => {
  return httpClient.post(server.ADD_PROMOTION_URL,data);
};

export const editPromotion = (data) => {
  return httpClient.put(server.PUT_EDIT_PROMOTION_URL,data);
};

export const delPromotion = (data) => {
  return httpClient.put(server.DELETE_PROMOTION_URL,data);
};



  