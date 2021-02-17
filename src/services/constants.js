
export const apiUrl = `${process.env.VUE_APP_NODE_URL}`;
//export const Token  = `${localStorage.getItem(server.TOKEN_KEY)}`;
//export const imageUrl = "http://localhost:8081/images";

export const server = {
  //LoginPage
  REGISTER_URL:`/users/regis`,
  LOGIN_URL:`/users/login`,
  TOKEN_KEY:`token`,
  USERNAME:`username`,

  //Home
  DASHBOARD_URL:`/dashboard/showall`,
  
  //Customer
  CUSTOMERTYPESELECTOR_URL:`/customers/customertypeselector`,
  LISTALLCUSTOMERS_URL:`/customers/listallcustomers`,

  NEWCUSTOMER_URL:`/customers/newcustomer`,
  NEWCUSTOMER_TAX_INVOICE_URL:`/customers/newcustomertaxinv`,
  LIST_CUSTOMER_EDIT_URL:`/customers/listcustomer`,

  EDIT_CUSTOMER_URL:`/customers/editcustomer`,
  DELETE_CUSTOMER_URL:`/customers/delcustomer`,

  //Province, Amphoe, Districts
  LIST_FIND_PROVINCE_URL:`/districts/findprovince`,

  LIST_FIND_AMPHOE_URL:`/districts/findamphoe`,

  LIST_FIND_DISTRICT_URL:`/districts/finddistrict`,

  //Quotation
  LIST_ALL_QUOTATION_URL:`/quotations/listallquotations`,
  LIST_STATUS_QUOTATION_SELECTOR_URL:`/quotations/statusquotationtoselect`,
  UPDATE_STATUS_QUOTATION_SELECTOR_URL:`/quotations/confirmquotstat`,
  PRINT_QUOTATION_URL:`/quotations/printquotation`,
  LIST_CUSTOMER_QUOTATION_URL:`/quotations/listallcustomers`,
  LIST_CUSTOMER_CREATE_QUOTATION_URL:`/quotations/findcustomerinfo`,
  LIST_ALL_PACKAGE_QUOTATION_URL:`/packages/listallpackage`,
  LIST_ALL_PROMOTION_QUOTATION_URL:`/quotations/listallpromotions`,

  LIST_EDIT_QUOTATION_URL:`/quotations/listquotation`,
  
  ADD_QUOTATION_URL:`/quotations/newquotations`,

  PUT_EDIT_SET_QUOTATION_URL:`/quotations/editquotation`,

  DELETE_QUOTATION_URL:`/quotations/delquotation`,
  //Equipment
  LIST_ALL_EQUIPMENT_URL:`/equipments/listallequipment`,
  LIST_EDIT_EQUIPMENT_URL:`/equipments/listequipment`,
  
  ADD_EQUIPMENT_URL:`/equipments/addnewequipment`,
  PUT_EDIT_EQUIPMENT_URL:`/equipments/editequipment`,
  DELETE_EQUIPMENT_URL:`/equipments/delequipment`,

  //Package 
  LIST_ALL_PACKAGE_URL:`/packages/listallpackage`,
  LIST_ALL_Equipments_PackageUse_URL:`/packages/listallequiptopackuse`,
  LIST_EDIT_PACKAGE_URL:`/packages/listpackages`,

  ADD_PACKAGE_URL:`/packages/addnewpackage`,
  PUT_EDIT_PACKAGE_URL:`/packages/editpackage`,
  DELETE_PACKAGE_URL:`/packages/delpackage`,

  //Promotion
  LIST_ALL_PROMOTION_URL:`/promotions/listallpromotions`,
  LIST_EDIT_PROMOTION_URL:`/promotions/listpromotions`,

  ADD_PROMOTION_URL:`/promotions/addnewpromotion`,
  PUT_EDIT_PROMOTION_URL:`/promotions/editpromotion`,
  DELETE_PROMOTION_URL:`/promotions/delpromotion`,

  
};
