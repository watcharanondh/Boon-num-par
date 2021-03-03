import axios from "axios";
import { apiUrl, server } from "@/services/constants";

const redirectLogin = error => {
  console.log(error.response.status);
  let ck_status = error.response.status;
  if (ck_status == 401) {
    localStorage.removeItem(server.TOKEN_KEY);
    window.location.href = "bnp/Login";
  }
  //localStorage.removeItem(server.TOKEN_KEY);
  //window.location.href="bnp/Login"
};

//Dashboard
export const getDashboard = () => {
  return axios
    .get(apiUrl + server.DASHBOARD_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//Customer
export const getListcustomertypeselector = () => {
  return axios
    .get(apiUrl + server.CUSTOMERTYPESELECTOR_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
export const getListallcustomers = () => {
  return axios
    .get(apiUrl + server.LISTALLCUSTOMERS_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getListEditcustomers = data => {
  return axios
    .post(apiUrl + server.LIST_CUSTOMER_EDIT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const addNewpersonnal = data => {
  return axios
    .post(apiUrl + server.NEWCUSTOMER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const Editcustomer = data => {
  return axios
    .post(apiUrl + server.EDIT_CUSTOMER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const delCustomer = data => {
  return axios
    .post(apiUrl + server.DELETE_CUSTOMER_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//GetProvince
export const getProvinces = () => {
  return axios
    .get(apiUrl + server.LIST_FIND_PROVINCE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//GetAMPHOE
export const getAmphoe = data => {
  return axios
    .post(apiUrl + server.LIST_FIND_AMPHOE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//GetProvince
export const getDistrict = data => {
  return axios
    .post(apiUrl + server.LIST_FIND_DISTRICT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//Quotation

export const getQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
export const getStatusQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_STATUS_QUOTATION_SELECTOR_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
export const getCustomerQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_CUSTOMER_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
export const getCreateCustomerQuotation = data => {
  return axios
    .post(apiUrl + server.LIST_CUSTOMER_CREATE_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
export const getPackageQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PACKAGE_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
export const getPromotionQuotation = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PROMOTION_QUOTATION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getEditQuotation = data => {
  return axios
    .post(apiUrl + server.LIST_EDIT_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const updateStatusQuotation = data => {
  return axios.post(
    apiUrl + server.UPDATE_STATUS_QUOTATION_SELECTOR_URL,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    }
  );
};

export const addQuotation = data => {
  return axios
    .post(apiUrl + server.ADD_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const editQuotation = data => {
  return axios
    .post(apiUrl + server.PUT_EDIT_SET_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const delQuotation = data => {
  return axios
    .post(apiUrl + server.DELETE_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getPrintQuotation = data => {
  return axios
    .post(apiUrl + server.PRINT_QUOTATION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//Equipment
export const getEquipment = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_EQUIPMENT_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getEditequipment = data => {
  return axios
    .post(apiUrl + server.LIST_EDIT_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const addEquipment = data => {
  return axios
    .post(apiUrl + server.ADD_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const editEquipment = data => {
  return axios
    .post(apiUrl + server.PUT_EDIT_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const delEquipment = data => {
  return axios
    .post(apiUrl + server.DELETE_EQUIPMENT_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//Package
export const getPackage = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PACKAGE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getlistEquipmentToPackage = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_Equipments_PackageUse_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const addPackage = data => {
  return axios
    .post(apiUrl + server.ADD_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getEditPackage = data => {
  return axios
    .post(apiUrl + server.LIST_EDIT_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const editPackage = data => {
  return axios
    .post(apiUrl + server.PUT_EDIT_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const delPackage = data => {
  return axios
    .post(apiUrl + server.DELETE_PACKAGE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

//Promotion

export const getPromotion = () => {
  return axios
    .get(apiUrl + server.LIST_ALL_PROMOTION_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const getEditpromotion = data => {
  return axios
    .post(apiUrl + server.LIST_EDIT_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const addPromotion = data => {
  return axios
    .post(apiUrl + server.ADD_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const editPromotion = data => {
  return axios
    .post(apiUrl + server.PUT_EDIT_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};

export const delPromotion = data => {
  return axios
    .post(apiUrl + server.DELETE_PROMOTION_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(server.TOKEN_KEY)}`
      }
    })
    .catch(error => {
      redirectLogin(error);
    });
};
