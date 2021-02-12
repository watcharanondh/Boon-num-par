import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Homemenu from "@/views/Homemenu.vue";
import Home from "@/views/Home.vue";

import Customer from "@/views/Customer.vue";
import MonitorPersonltype from "@/views/MonitorPersonltype.vue";
import CreatePersoneltype from "@/views/CreatePersoneltype.vue";
import EditPersoneltype from "@/views/EditPersoneltype.vue";

import Quotation from "@/views/Quotation.vue";
import CreateQuotation from "@/views/CreateQuotation.vue";
import EditQuotation from "@/views/EditQuotation.vue";
import QuotationPrint from "@/views/QuotationPrint.vue"; 

import Equipment from "@/views/Equipment.vue";
import CreateEquipment from "@/views/CreateEquipment.vue";
import EditEquipment from "@/views/EditEquipment.vue";

import SetEquipment from "@/views/SetEquipment.vue";
import CreateSetEquipment from "@/views/CreateSetEquipment.vue";
import EditSetEquipment from "@/views/EditSetEquipment.vue";

import Package from "@/views/Package.vue"; 
import CreatePackage from "@/views/CreatePackage.vue";
import EditPackage from "@/views/EditPackage.vue";

import Promotion from "@/views/Promotion.vue";
import CreatePromotion from "@/views/CreatePromotion.vue";
import EditPromotion from "@/views/EditPromotion.vue";


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
    path: "/MonitorPersonltype",
    name: "/MonitorPersonltype",
    component: MonitorPersonltype
  },
  {
    path: "/CreatePersoneltype",
    name: "Create/Personeltype",
    component: CreatePersoneltype
  },
  {
    path: "/EditPersoneltype",
    name: "/EditPersoneltype",
    component: EditPersoneltype
  },

  {
    path: "/Quotation",
    name: "/Quotation",
    component: Quotation
  },
  {
    path: "/CreateQuotation",
    name: "/CreateQuotation",
    component: CreateQuotation
  },
  {
    path: "/EditQuotation",
    name: "/EditQuotation",
    component: EditQuotation
  },
  {
    path: "/QuotationPrint",
    name: "/QuotationPrint",
    component: QuotationPrint
  },
  {
    path: "/Equipment",
    name: "/Equipment",
    component: Equipment
  },
  {
    path: "/CreateEquipment",
    name: "/CreateEquipment",
    component: CreateEquipment
  },
  {
    path: "/EditEquipment",
    name: "/EditEquipment",
    component: EditEquipment
  },
  {
    path: "/SetEquipment",
    name: "/SetEquipment",
    component: SetEquipment
  },
  {
    path: "/CreateSetEquipment",
    name: "/CreateSetEquipment",
    component: CreateSetEquipment
  },
  {
    path: "/EditSetEquipment",
    name: "/EditSetEquipment",
    component: EditSetEquipment
  },
  {
    path: "/Package",
    name: "/Package",
    component: Package
  },
  {
    path: "/CreatePackage",
    name: "/CreatePackage",
    component: CreatePackage
  },
  {
    path: "/EditPackage",
    name: "/EditPackage",
    component: EditPackage
  },
  {
    path: "/Promotion",
    name: "/Promotion",
    component: Promotion
  },
  {
    path: "/CreatePromotion",
    name: "/CreatePromotion",
    component: CreatePromotion
  },
  {
    path: "/EditPromotion",
    name: "/EditPromotion",
    component: EditPromotion
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
