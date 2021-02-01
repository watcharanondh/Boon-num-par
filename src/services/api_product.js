//import { imageUrl } from "./constants";
//import httpClient from "@/services/httpClient";
import axios from "axios";
import { server } from "@/services/constants";

//Dashboard
export const getDashboard = () => {
  return axios.get(server.DASHBOARD_URL);
};

//Customer
export const getListcustomertypeselector = () => {
  return axios.get(server.CUSTOMERTYPESELECTOR_URL);
};
export const getListallcustomers = () => {
  return axios.get(server.LISTALLCUSTOMERS_URL);
};

export const getNewcustomer = data => {
  return axios.post(server.NEWCUSTOMER_URL, data);
};

export const getNewcustomertaxinv = data => {
  return axios.post(server.NEWCUSTOMER_TAX_INVOICE_URL, data);
};

export const getListcustomer = data => {
  return axios.post(server.LIST_CUSTOMER_EDIT_URL, data);
};

//GetProvince
export const getProvince = () => {
  return axios.get(server.LIST_FIND_PROVINCE_URL);
};
//GetAMPHOE
export const getAmphoe = () => {
  return axios.get(server.LIST_FIND_AMPHOE_URL);
};
//GetProvince
export const getDistrict = () => {
  return axios.get(server.LIST_FIND_DISTRICT_URL);
};






// export const getProductById = id => {
//     return httpClient.get(server.PRODUCT_URL + `/id/${id}`);
//   };
  
//   export const addProduct = data => {
//     return httpClient.post(server.PRODUCT_URL, data);
//   };
  
//   export const deleteProduct = id => {
//     return httpClient.delete(server.PRODUCT_URL + `/id/${id}`);
//   };
  
//   export const updateProduct = data => {
//     return httpClient.put(server.PRODUCT_URL, data);
//   };
  