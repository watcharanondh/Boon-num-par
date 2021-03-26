import axios from "axios";
import { apiUrl, server } from "@/services/constants";

const redirectLogin = (error) => {
  console.log(error.response.status);
  let ck_status = error.response.status;
  if (ck_status == 401) {
    localStorage.removeItem(server.TOKEN_KEY);
    window.location.href = "bnp/Login";
  }
  //localStorage.removeItem(server.TOKEN_KEY);
  //window.location.href="bnp/Login"
};

//Admin
export const getListalladminuser = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_ADMIN_USER_MANAGER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListsetinmodaladminuser = () => {
  return axios
    .get(apiUrl + server.LIST_SETINMODAL_POSITION_ADMIN_USER_MANAGER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addadminuser = (data) => {
  return axios
    .post(apiUrl + server.ADD_ADMIN_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditadminuser = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_ADMIN_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editadminuser = (data) => {
  return axios
    .post(apiUrl + server.EDIT_ADMIN_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const deladminuser = (data) => {
  return axios
    .post(apiUrl + server.DEL_ADMIN_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//Staff
export const getListallstaffuser = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_STAFF_USER_MANAGER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListsetinmodalstaffuser = () => {
  return axios
    .get(apiUrl + server.LIST_SETINMODAL_POSITION_STAFF_USER_MANAGER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addstaffuser = (data) => {
  return axios
    .post(apiUrl + server.ADD_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditstaffuser = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editstaffuser = (data) => {
  return axios
    .post(apiUrl + server.EDIT_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delstaffuser = (data) => {
  return axios
    .post(apiUrl + server.DEL_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//Staff_Position
export const getListallstaffpositionuser = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_STAFF_POSITION_USER_MANAGER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListsetinmodalstaffpositionuser = () => {
  return axios
    .get(apiUrl + server.LIST_ROLES_STAFF_USER_MANAGER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addstaffpositionuser = (data) => {
  return axios
    .post(apiUrl + server.ADD_POSITION_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditstaffpositionuser = (data) => {
  return axios
    .post(apiUrl + server.LIST_POSITION_EDIT_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editstaffpositionuser = (data) => {
  return axios
    .post(apiUrl + server.EDIT_POSITION_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delstaffpositionuser = (data) => {
  return axios
    .post(apiUrl + server.DEL_POSITION_STAFF_USER_MANAGER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Dashboard
export const getDashboard = () => {
  return axios
    .get(apiUrl + server.DASHBOARD_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Customer
export const getListcustomertypeselector = () => {
  return axios
    .get(apiUrl + server.CUSTOMERTYPESELECTOR_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListallcustomers = () => {
  return axios
    .get(apiUrl + server.LISTALLCUSTOMERS_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListEditcustomers = (data) => {
  return axios
    .post(apiUrl + server.LIST_CUSTOMER_EDIT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addNewpersonnal = (data) => {
  return axios
    .post(apiUrl + server.NEWCUSTOMER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const Editcustomer = (data) => {
  return axios
    .post(apiUrl + server.EDIT_CUSTOMER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delCustomer = (data) => {
  return axios
    .post(apiUrl + server.DELETE_CUSTOMER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//GetProvince
export const getProvinces = () => {
  return axios
    .get(apiUrl + server.LIST_FIND_PROVINCE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//GetAMPHOE
export const getAmphoe = (data) => {
  return axios
    .post(apiUrl + server.LIST_FIND_AMPHOE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//GetProvince
export const getDistrict = (data) => {
  return axios
    .post(apiUrl + server.LIST_FIND_DISTRICT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Quotation
export const getQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getStatusQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_STATUS_QUOTATION_SELECTOR_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getCustomerQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_CUSTOMER_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getCreateCustomerQuotation = (data) => {
  return axios
    .post(apiUrl + server.LIST_CUSTOMER_CREATE_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getPackageQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PACKAGE_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getPromotionQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PROMOTION_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditQuotation = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const updateStatusQuotation = (data) => {
  return axios.post(
    apiUrl + server.UPDATE_STATUS_QUOTATION_SELECTOR_URL,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    }
  );
};
export const addQuotation = (data) => {
  return axios
    .post(apiUrl + server.ADD_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editQuotation = (data) => {
  return axios
    .post(apiUrl + server.PUT_EDIT_SET_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delQuotation = (data) => {
  return axios
    .post(apiUrl + server.DELETE_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListAllFoodItems = () => {
  return axios
    .get(apiUrl + server.LIST_All_FOODITEMS_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getPrintQuotation = (data) => {
  return axios
    .post(apiUrl + server.PRINT_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};


//Equipment
export const getEquipment = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_EQUIPMENT_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditequipment = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addEquipment = (data) => {
  return axios
    .post(apiUrl + server.ADD_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editEquipment = (data) => {
  return axios
    .post(apiUrl + server.PUT_EDIT_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delEquipment = (data) => {
  return axios
    .post(apiUrl + server.DELETE_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Package
export const getPackage = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PACKAGE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getlistEquipmentToPackage = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_Equipments_PackageUse_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addPackage = (data) => {
  return axios
    .post(apiUrl + server.ADD_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditPackage = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editPackage = (data) => {
  return axios
    .post(apiUrl + server.PUT_EDIT_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delPackage = (data) => {
  return axios
    .post(apiUrl + server.DELETE_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Promotion
export const getPromotion = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PROMOTION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getEditpromotion = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addPromotion = (data) => {
  return axios
    .post(apiUrl + server.ADD_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editPromotion = (data) => {
  return axios
    .post(apiUrl + server.PUT_EDIT_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const delPromotion = (data) => {
  return axios
    .post(apiUrl + server.DELETE_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teambnp

//เมนู ข้อมูลทีมจัดงาน => รายการจัดทีม
export const getEventteaminformation = (data) => {
  return axios
    .post(apiUrl + server.LIST_ALL_EVENTTEAMINFORMATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const Findmoment = (data) => {
  return axios
    .post(apiUrl + server.FIND_MOMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getupdatelookandmanageappointment = () => {
  return axios
    .get(apiUrl + server.LIST_UPDATELOOKANDMANAGEAPPOINTMENT_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const AssignTeamtoWork = (data) => {
  return axios
    .post(apiUrl + server.LIST_UPDATE_ASSIGNWORKTEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const List_SHIPPING_TO_SEE = (data) => {
  return axios
    .post(apiUrl + server.List_SHIPPING_TO_SEE, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teambnp => Explorearea
export const TeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.LIST_ALL_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListmanagetaskTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.LIST_MANAGETASK_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListchkcreateTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.LIST_CREATE_LIST_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListchkTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.LIST_CHECK_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const EditchklistTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.EDIT_CHECK_LIST_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DelchklistTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.DEL_CHECK_LIST_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const CreateimgTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.CREATE_IMG_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DELimgTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.DEL_IMG_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const RecheckTeamSurvey = (data) => {
  return axios
    .post(apiUrl + server.RECHECK_SURVEY_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teambnp => Placearrangement
export const TeamSetup = (data) => {
  return axios
    .post(apiUrl + server.LIST_ALL_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListmanagetaskTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.LIST_MANAGETASK_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListchkcreateTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.LIST_CREATE_LIST_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListchkTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.LIST_CHECK_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const EditchklistTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.EDIT_CHECK_LIST_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DelchklistTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.DEL_CHECK_LIST_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const CreateimgTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.CREATE_IMG_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DELimgTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.DEL_IMG_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const RecheckbeforeTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.RECHECK_BEFORE_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const RecheckbetweenTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.RECHECK_BETWEEN_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const RecheckafterTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.RECHECK_AFTER_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const descriptionTeamSetup = (data) => {
  return axios
    .post(apiUrl + server.DESCRIPTION_SETUP_TEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teambnp => Team Management
export const getListallTeams = () => {
  return axios
    .get(apiUrl + server.LIST_MANAGETEAM_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//
export const getListtoCreateTeam = () => {
  return axios
    .get(apiUrl + server.LIST_CREATE_TO_MANAGETEAM_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//
export const getListTeamtoEdit = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_TO_MANAGETEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//
export const addNewTeam = (data) => {
  return axios
    .post(apiUrl + server.ADD_MANAGETEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//
export const editTeam = (data) => {
  return axios
    .post(apiUrl + server.PUT_EDIT_MANAGETEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//
export const deleteTeam = (data) => {
  return axios
    .post(apiUrl + server.DEL_MANAGETEAM_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teambnp => Checklists
export const getListtoChecklists = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_CHECKLISTS_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListEdittoChecklists = (data) => {
  return axios
    .post(apiUrl + server.LIST_EDIT_TO_CHECKLISTS_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const AddChecklists = (data) => {
  return axios
    .post(apiUrl + server.LIST_ADD_CHECKLISTS_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const EditChecklists = (data) => {
  return axios
    .post(apiUrl + server.PUT_EDIT_CHECKLISTS_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DelChecklists = (data) => {
  return axios
    .post(apiUrl + server.DEL_CHECKLISTS_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//workprogress
export const getListDoneTaskteambnp = (data) => {
  return axios
    .post(apiUrl + server.LIST_DONE_TASK_URL_TEAMBNP, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListTaskChartteambnp = (data) => {
  return axios
    .post(apiUrl + server.LIST_DONE_CHART_URL_TEAMBNP, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListAllTasksteambnp = (data) => {
  return axios
    .post(apiUrl + server.LIST_ALL_TASK_URL_TEAMBNP, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListTasktoseeteambnp = (data) => {
  return axios
    .post(apiUrl + server.LIST_TASK_TO_SEE_URL_TEAMBNP, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};


//teamhong
/* ------- shipping ------- */
//เมนู ข้อมูลทีมจัดงาน => รายการจัดทีมทั้งหมด
export const Listshippinglineupfoods = (data) => {
  return axios
    .post(apiUrl + server.LIST_ALL_SHIPPING_LINEUP_FOOD_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//เมนู ข้อมูลทีมจัดงาน => รายการจัดทีม หาช่วงเวลา
export const Findmomentlineupfood = (data) => {
  return axios
    .post(apiUrl + server.FIND_MOMENT_LINEUP_FOOD_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//Modal รับ อัพเดท นัดดู&จัดสถานที่
export const getupdateshippinglineupfood = () => {
  return axios
    .get(apiUrl + server.LIST_TEAMS_AND_DRIVERS_LINEUP_FOOD_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//Modal ส่ง อัพเดท นัดดู&จัดสถานที่
export const AssignTeamtoWorklineupfood = (data) => {
  return axios
    .post(apiUrl + server.UPDATE_ASSIGNWORKTEAM_LINEUP_FOOD_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//เมนู ข้อมูลทีมจัดงาน => ดูข้อมูลรายละเอียด รายการจัดทีม
export const listshippingtosee = (data) => {
  return axios
    .post(apiUrl + server.LIST_SHIPPING_TO_SEE_LINEUP_FOOD_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};


/* ------- Lineupfood Process ALL ------- */
export const getListAllLineupfood = (data) => {
  return axios
    .post(apiUrl + server.LIST_All_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListmanagetaskLineupfood = (data) => {
  return axios
    .post(apiUrl + server.MANAGE_TASK_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const CreateimgLineupfood = (data) => {
  return axios
    .post(apiUrl + server.CREATE_IMAGE_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DELimgLineupfood = (data) => {
  return axios
    .post(apiUrl + server.DELETE_IMAGE_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};


/* ------- ChklistLineupfoodteamhong ------- */
export const ListchkcreateLineupfood = (data) => {
  return axios
    .post(apiUrl + server.CREATE_CHECKLIST_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const ListchktoEditLineupfood = (data) => {
  return axios
    .post(apiUrl + server.LIST_CHECKLIST_TO_EDIT_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const EditchklistLineupfood = (data) => {
  return axios
    .post(apiUrl + server.EDIT_CHECKLIST_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const RecheckbeforeLineupfood = (data) => {
  return axios
    .post(apiUrl + server.UPDATE_CHECKLIST_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const RecheckafterLineupfood = (data) => {
  return axios
    .post(apiUrl + server.UPDATE_RETURNED_CHECKLIST_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DelchklistLineupfood = (data) => {
  return axios
    .post(apiUrl + server.DELETE_CHECKLIST_LINEUPFOODTEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
/* ------- ChklistEquipmentteamhong ------- */
export const getChklistEquipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.LIST_All_INMODUL_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const createandupdatequipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.CREATE_AND_UPDATE_INMODUL_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const Recheckbeforeequipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.UPDATE_INMODUL_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const Recheckafterbeforeequipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.UPDATE_RETURNED_INMODUL_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getDescriptionafterequipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.DESCRIPTION_INMODUL_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addDescriptionafterequipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.EDIT_DESCRIPTION_INMODUL_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const deleteChklistEquipmentteamhong = (data) => {
  return axios
    .post(apiUrl + server.DELETE_INMODU_CHECKLISTEQUIPMENT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
//Teamhong => Workprogressteamhong
export const getListDoneTaskteamhong = (data) => {
  return axios
    .post(apiUrl + server.LIST_DONE_TASK_URL_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListTaskChartteamhong = (data) => {
  return axios
    .post(apiUrl + server.LIST_DONE_CHART_URL_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListAllTasksteamhong = (data) => {
  return axios
    .post(apiUrl + server.LIST_ALL_TASK_URL_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListTasktoseeteamhong = (data) => {
  return axios
    .post(apiUrl + server.LIST_TASK_TO_SEE_URL_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teamhong => Team Management
export const getListallTeamhong = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_TEAMS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListtoCreateTeamhong = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_USERS_TO_CREATETEAM, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListTeamhongtoEdit = (data) => {
  return axios
    .post(apiUrl + server.LIST_TEAM_TO_EDIT, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const addNewTeamhong = (data) => {
  return axios
    .post(apiUrl + server.CREATE_NEW_TEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const editTeamhong = (data) => {
  return axios
    .post(apiUrl + server.EDIT_TEAM, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const deleteTeamhong = (data) => {
  return axios
    .post(apiUrl + server.DELETE_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};

//Teamhong => Checklists
export const getListtoChecklistsTeamhong = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_CHECKLISTS_TEAMHONG, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const getListEdittoChecklistsTeamhong = (data) => {
  return axios
    .post(apiUrl + server.LIST_CHECKLISTS_TO_EDIT_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const AddChecklistsTeamhong = (data) => {
  return axios
    .post(apiUrl + server.CREATE_NEW_CHECKLIST_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const EditChecklistsTeamhong = (data) => {
  return axios
    .post(apiUrl + server.EDIT_CHECKLISS_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};
export const DelChecklistsTeamhong = (data) => {
  return axios
    .post(apiUrl + server.DELETE_CHECKLIST_TEAMHONG, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`,
      },
    })
    .catch((error) => {
      redirectLogin(error);
    });
};