//import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";
import * as productApis from "@/services/api_product.js"


const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const login =  values => {
  // let result = await httpClient.post(server.LOGIN_URL, values);
  // if (result.data.result == "ok") {
  //   localStorage.setItem(server.USERNAME, values.username);
  //   localStorage.setItem(server.TOKEN_KEY, result.data.token);
  //   router.push("/Homemenu");
  //   return true;
  // } else {
  //   return false;
  // }
    //config.headers = { "Authorization": userToken };
    localStorage.setItem(server.USERNAME, values.username);
    localStorage.setItem(server.TOKEN_KEY, "1234");
    return true
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
