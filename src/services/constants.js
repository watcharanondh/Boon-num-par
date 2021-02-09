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

  //Home
  DASHBOARD_URL:`dashboard/showall`,
  
  //Customer
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

  //Quotation //////////////////////////////////////

  //Equipment
  LIST_ALL_EQUIPMENT_URL:`equipments/listallequipment`,
  LIST_EDIT_EQUIPMENT_URL:`equipments/listequipment`,
  
  ADD_EQUIPMENT_URL:`equipments/addnewequipment`,
  PUT_EDIT_EQUIPMENT_URL:`equipments/editequipment`,
  DELETE_EQUIPMENT_URL:`equipments/delequipment`,

  //Equipment SET
  LIST_ALL_SET_EQUIPMENT_URL:`equipmentsets/listallequipmentset`,
  LIST_ALL_SET_MINI_EQUIPMENT_URL:`equipmentsets/listallequiptoequipset`,
  
  ADD_SET_EQUIPMENT_URL:`equipmentsets/addnewequipmentset`,
 

  PUT_EDIT_SET_EQUIPMENT_URL:`equipmentsets/listequipmentset`,
  DELETE_SET_EQUIPMENT_URL:`equipmentsets/delequipmentset`,

  //Package 
  LIST_ALL_PACKAGE_URL:`packages/listallpackage`,
  LIST_ALL_Equipments_PackageUse_URL:`packages/listallequiptopackuse`,
  LIST_EDIT_PACKAGE_URL:`packages/listpackages`,

  ADD_PACKAGE_URL:`packages/addnewpackage`,
  PUT_EDIT_PACKAGE_URL:`packages/editpackage`,
  DELETE_PACKAGE_URL:`packages/delpackage`,

  //Promotion
  LIST_ALL_PROMOTION_URL:`promotions/listallpromotions`,
  LIST_EDIT_PROMOTION_URL:`promotions/listpromotions`,

  ADD_PROMOTION_URL:`promotions/addnewpromotion`,
  PUT_EDIT_PROMOTION_URL:`promotions/editpromotion`,
  DELETE_PROMOTION_URL:`promotions/delpromotion`,

  
};
