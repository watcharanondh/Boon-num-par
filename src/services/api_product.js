import axios from "axios";
import { apiUrl , server } from "@/services/constants";


//Dashboard
export const getDashboard = () => {
  return axios.get(apiUrl + server.DASHBOARD_URL ,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//Customer
export const getListcustomertypeselector = () => {
  return axios.get(apiUrl + server.CUSTOMERTYPESELECTOR_URL ,{headers: {"Authorization":`Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getListallcustomers = () => {
  return axios.get(apiUrl + server.LISTALLCUSTOMERS_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getListEditcustomers = (data) => {
  return axios.post(apiUrl + server.LIST_CUSTOMER_EDIT_URL, data ,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const addNewpersonnal = (data) => {
  return axios.post(apiUrl + server.NEWCUSTOMER_URL, data ,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const Editcustomer = (data) => {
  return axios.post(apiUrl + server.EDIT_CUSTOMER_URL, data ,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const delCustomer = (data) => {
  return axios.post(apiUrl + server.DELETE_CUSTOMER_URL, data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//GetProvince
export const getProvinces = () => {
  return axios.get(apiUrl + server.LIST_FIND_PROVINCE_URL, {headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//GetAMPHOE
export const getAmphoe = (data) => {
  return axios.post(apiUrl + server.LIST_FIND_AMPHOE_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//GetProvince
export const getDistrict = (data) => {
  return axios.post(apiUrl + server.LIST_FIND_DISTRICT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//Quotation

export const getQuotation = () => {
  return axios.get(apiUrl + server.LIST_ALL_QUOTATION_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getStatusQuotation = () => {
  return axios.get(apiUrl + server.LIST_STATUS_QUOTATION_SELECTOR_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getCustomerQuotation = () => {
  return axios.get(apiUrl + server.LIST_CUSTOMER_QUOTATION_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getCreateCustomerQuotation = (data) => {
  return axios.post(apiUrl + server.LIST_CUSTOMER_CREATE_QUOTATION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getPackageQuotation = () => {
  return axios.get(apiUrl + server.LIST_ALL_PACKAGE_QUOTATION_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getPromotionQuotation = () => {
  return axios.get(apiUrl + server.LIST_ALL_PROMOTION_QUOTATION_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getEditQuotation = (data) => {
  return axios.post(apiUrl + server.LIST_EDIT_QUOTATION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const updateStatusQuotation = (data) => {
  return axios.post(apiUrl + server.UPDATE_STATUS_QUOTATION_SELECTOR_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const addQuotation = (data) => {
  return axios.post(apiUrl + server.ADD_QUOTATION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const editQuotation = (data) => {
  return axios.post(apiUrl + server.PUT_EDIT_SET_QUOTATION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const delQuotation = (data) => {
  return axios.post(apiUrl + server.DELETE_QUOTATION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getPrintQuotation = (data) => {
  return axios.post(apiUrl + server.PRINT_QUOTATION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//Equipment
export const getEquipment = () => {
  return axios.get(apiUrl + server.LIST_ALL_EQUIPMENT_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getEditequipment = (data) => {
  return axios.post(apiUrl + server.LIST_EDIT_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const addEquipment = (data) => {
  return axios.post(apiUrl + server.ADD_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const editEquipment = (data) => {
  return axios.post(apiUrl + server.PUT_EDIT_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const delEquipment = (data) => {
  return axios.post(apiUrl + server.DELETE_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//Equipment SET
export const getSetEquipment = () => {
  return axios.get(apiUrl + server.LIST_ALL_SET_EQUIPMENT_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getSetEquipmentmini = () => {
  return axios.get(apiUrl + server.LIST_ALL_SET_MINI_EQUIPMENT_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};
export const getEditSetEquipmentmini = (data) => {
  return axios.post(apiUrl + server.LIST_EDIT_SET_MINI_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const addSetEquipment = (data) => {
  return axios.post(apiUrl + server.ADD_SET_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const editSetEquipment = (data) => {
  return axios.post(apiUrl + server.PUT_EDIT_SET_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const delSetEquipment = (data) => {
  return axios.post(apiUrl + server.DELETE_SET_EQUIPMENT_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

//Package
export const getPackage = () => {
  return axios.get(apiUrl + server.LIST_ALL_PACKAGE_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getlistEquipmentToPackage = () => {
  return axios.get(apiUrl + server.LIST_ALL_Equipments_PackageUse_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const addPackage = (data) => {
  return axios.post(apiUrl + server.ADD_PACKAGE_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getEditPackage = (data) => {
  return axios.post(apiUrl + server.LIST_EDIT_PACKAGE_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const editPackage = (data) => {
  return axios.post(apiUrl + server.PUT_EDIT_PACKAGE_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const delPackage = (data) => {
  return axios.post(apiUrl + server.DELETE_PACKAGE_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};


//Promotion

export const getPromotion = () => {
  return axios.get(apiUrl + server.LIST_ALL_PROMOTION_URL,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const getEditpromotion = (data) => {
  return axios.post(apiUrl + server.LIST_EDIT_PROMOTION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const addPromotion = (data) => {
  return axios.post(apiUrl + server.ADD_PROMOTION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const editPromotion = (data) => {
  return axios.post(apiUrl + server.PUT_EDIT_PROMOTION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};

export const delPromotion = (data) => {
  return axios.post(apiUrl + server.DELETE_PROMOTION_URL,data,{headers: {"Authorization": `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`}});
};



  