import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Homemenu from "@/views/Homemenu.vue";
import Home from "@/views/Home.vue";
import Customer from "@/views/Customer.vue";
import Personneltype from "@/views/Personneltype.vue";
import PersonalCreateQuotation from "@/views/PersonalCreateQuotation.vue";
import Companytype from "@/views/Companytype.vue";
import CompanyCreateQuotation from "@/views/CompanyCreateQuotation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Homemenu",
    name: "Homemenu",
    component: Homemenu
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/Customer",
    name: "/Customer",
    component: Customer
  },
  {
    path: "/Personneltype",
    name: "/Personneltype",
    component: Personneltype
  },
  {
    path: "/PersonalCreateQuotation",
    name: "/PersonalCreateQuotation",
    component: PersonalCreateQuotation
  },
  {
    path: "/Companytype",
    name: "/Companytype",
    component: Companytype
  },
  {
    path: "/CompanyCreateQuotation",
    name: "/CompanyCreateQuotation",
    component: CompanyCreateQuotation
  },
  {
    path: "/",
    redirect: "Login",
  },
  {
    path: "*",
    redirect: "/Login",
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
