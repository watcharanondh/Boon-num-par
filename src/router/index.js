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
import Quotation from "@/views/Quotation.vue";
import QuotationCreate from "@/views/QuotationCreate.vue";
import QuotationCreateSelectPackage from "@/views/QuotationCreateSelectPackage.vue";
import QuotationCreateSelectPromotion from "@/views/QuotationCreateSelectPromotion.vue";
import QuotationPrint from "@/views/QuotationPrint.vue"; 
import Package from "@/views/Package.vue"; 
import CreatePackage from "@/views/CreatePackage.vue"; 
import CreatePackageSelectEquipment from "@/views/CreatePackageSelectEquipment.vue"; 
import Promotion from "@/views/Promotion.vue";
import CreatePromotion from "@/views/CreatePromotion.vue";
import Equipment from "@/views/Equipment.vue";
import CreateEquipment from "@/views/CreateEquipment.vue";

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
    path: "/Quotation",
    name: "/Quotation",
    component: Quotation
  },
  {
    path: "/QuotationCreate",
    name: "/QuotationCreate",
    component: QuotationCreate
  },
  {
    path: "/QuotationCreateSelectPackage",
    name: "/QuotationCreateSelectPackage",
    component: QuotationCreateSelectPackage
  },
  {
    path: "/QuotationCreateSelectPromotion",
    name: "/QuotationCreateSelectPromotion",
    component: QuotationCreateSelectPromotion
  },
  {
    path: "/QuotationPrint",
    name: "/QuotationPrint",
    component: QuotationPrint
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
    path: "/CreatePackageSelectEquipment",
    name: "/CreatePackageSelectEquipment",
    component: CreatePackageSelectEquipment
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
