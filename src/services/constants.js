//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const apiUrl = `${process.env.VUE_APP_NODE_URL}`;
//export const imageUrl = "http://localhost:8081/images";

export const server = {
  //LoginPage
  REGISTER_URL:`users/regis`,
  LOGIN_URL:`users/login`,
  TOKEN_KEY:`token`,
  USERNAME:`username`,

  //HomePage
  DASHBOARD_URL:`dashboard/showall`,
  
  //CustomerPage
  CUSTOMERTYPESELECTOR_URL:`customers/customertypeselector`,
  LISTALLCUSTOMERS_URL:`customers/listallcustomers`,

  NEWCUSTOMER_URL:`customers/newcustomer`,
  NEWCUSTOMER_TAX_INVOICE_URL:`customers/newcustomertaxinv`,
  LIST_CUSTOMER_EDIT_URL:`customers/listcustomer`,

  EDIT_CUSTOMER_URL:`customers/editcustomer`,
  DELETE_CUSTOMER_URL:`customers/delcustomer`,

  //Province, Amphoe, Districts
  LIST_FIND_PROVINCE_URL:`districts/findprovince`,

  LIST_FIND_AMPHOE_URL:`districts/findamphoe`,

  LIST_FIND_DISTRICT_URL:`districts/finddistrict`,

  //List All Equipment
  LIST_ALL_EQUIPMENT_URL:`equipments/listallequipment`,

  
};
