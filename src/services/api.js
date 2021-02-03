import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";
import * as productApis from "@/services/api_product.js"


const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const login = async values => {
  let result = await httpClient.post(server.LOGIN_URL, values);
  if (result.data.response == "OK") {
    localStorage.setItem(server.USERNAME, values.username);
    localStorage.setItem(server.TOKEN_KEY, result.data.accessToken);
    return true;
  } else {
    return false;
  }
};

const logoff = () => {
  localStorage.removeItem(server.TOKEN_KEY);
  router.push("/Login");
};

export default {
  isLoggedIn,
  login,
  logoff,
  ...productApis
};
