export const apiUrl = `${process.env.VUE_APP_NODE_URL}`;
//export const Token  = `${localStorage.getItem(server.TOKEN_KEY)}`;
//export const imageUrl = "http://localhost:8081/images";

export const server = {
  //LoginPage
  REGISTER_URL: `/users/regis`,
  LOGIN_URL: `/users/login`,
  TOKEN_KEY: `token`,
  USERNAME: `username`,

  // Sale

  //Home
  DASHBOARD_URL: `/sale/dashboard/showall`,

  //Customer
  CUSTOMERTYPESELECTOR_URL: `/sale/customers/customertypeselector`,
  LISTALLCUSTOMERS_URL: `/sale/customers/listallcustomers`,

  NEWCUSTOMER_URL: `/sale/customers/newcustomer`,
  NEWCUSTOMER_TAX_INVOICE_URL: `/sale/customers/newcustomertaxinv`,
  LIST_CUSTOMER_EDIT_URL: `/sale/customers/listcustomer`,

  EDIT_CUSTOMER_URL: `/sale/customers/editcustomer`,
  DELETE_CUSTOMER_URL: `/sale/customers/delcustomer`,

  //Province, Amphoe, Districts
  LIST_FIND_PROVINCE_URL: `/districts/findprovince`,

  LIST_FIND_AMPHOE_URL: `/districts/findamphoe`,

  LIST_FIND_DISTRICT_URL: `/districts/finddistrict`,

  //Quotation
  LIST_ALL_QUOTATION_URL: `/sale/quotations/listallquotations`,
  LIST_STATUS_QUOTATION_SELECTOR_URL: `/sale/quotations/statusquotationtoselect`,
  UPDATE_STATUS_QUOTATION_SELECTOR_URL: `/sale/quotations/confirmquotstat`,
  PRINT_QUOTATION_URL: `/sale/quotations/printquotation`,
  LIST_CUSTOMER_QUOTATION_URL: `/sale/quotations/listallcustomers`,
  LIST_CUSTOMER_CREATE_QUOTATION_URL: `/sale/quotations/findcustomerinfo`,
  LIST_ALL_PACKAGE_QUOTATION_URL: `/sale/packages/listallpackage`,
  LIST_ALL_PROMOTION_QUOTATION_URL: `/sale/quotations/listallpromotions`,

  LIST_EDIT_QUOTATION_URL: `/sale/quotations/listquotation`,

  ADD_QUOTATION_URL: `/sale/quotations/newquotations`,

  PUT_EDIT_SET_QUOTATION_URL: `/sale/quotations/editquotation`,

  DELETE_QUOTATION_URL: `/sale/quotations/delquotation`,

  //Equipment
  LIST_ALL_EQUIPMENT_URL: `/sale/equipments/listallequipment`,
  LIST_EDIT_EQUIPMENT_URL: `/sale/equipments/listequipment`,

  ADD_EQUIPMENT_URL: `/sale/equipments/addnewequipment`,
  PUT_EDIT_EQUIPMENT_URL: `/sale/equipments/editequipment`,
  DELETE_EQUIPMENT_URL: `/sale/equipments/delequipment`,

  //Package
  LIST_ALL_PACKAGE_URL: `/sale/packages/listallpackage`,
  LIST_ALL_Equipments_PackageUse_URL: `/sale/packages/listallequiptopackuse`,
  LIST_EDIT_PACKAGE_URL: `/sale/packages/listpackages`,

  ADD_PACKAGE_URL: `/sale/packages/addnewpackage`,
  PUT_EDIT_PACKAGE_URL: `/sale/packages/editpackage`,
  DELETE_PACKAGE_URL: `/sale/packages/delpackage`,

  //Promotion
  LIST_ALL_PROMOTION_URL: `/sale/promotions/listallpromotions`,
  LIST_EDIT_PROMOTION_URL: `/sale/promotions/listpromotions`,

  ADD_PROMOTION_URL: `/sale/promotions/addnewpromotion`,
  PUT_EDIT_PROMOTION_URL: `/sale/promotions/editpromotion`,
  DELETE_PROMOTION_URL: `/sale/promotions/delpromotion`,

  //จบ sale

  //Team BNP

  //ModalUpdateLook&ManageAppointment and assignwork
  LIST_UPDATELOOKANDMANAGEAPPOINTMENT_URL:`/bnp/shipping/listteamtoshipping`,
  LIST_UPDATE_ASSIGNWORKTEAM_URL:`/bnp/shipping/assignworkteam`,

  //Findmoment
  FIND_MOMENT_URL:``,

  //List Shipping to SEE
  List_SHIPPING_TO_SEE:`/bnp/shipping/listshippingtosee`,


  //ModalUpdateLook&ManageAppointment
  LIST_ALL_SURVEY_TEAM_URL:`/bnp/surveyteam/listallsurveyteam`,


  //Customizecheck
  LIST_ALL_EVENTTEAMINFORMATION_URL:`/bnp/shipping/listallshipping`,
  LIST_TEAMS_ASSIGN_EVENTTEAMINFORMATION_URL:`/bnp/shipping/listteamtoshipping`,

  //Customizethesystem
  LIST_ALL_CUSTOMIZETHESYSTEM_URL:`/bnp/teammanage/listallteams`,
  LIST_ALL_CREATE_CUSTOMIZETHESYSTEM_URL:`/bnp/teammanage/listuserstocreateteam`,
  LIST_EDIT_CUSTOMIZETHESYSTEM_URL:`/bnp/teammanage/listteam`,

  ADD_CUSTOMIZETHESYSTEM_URL:`/bnp/teammanage/createteam`,
  PUT_EDIT_CUSTOMIZETHESYSTEM_URL:`/bnp/teammanage/editteam`,



};
