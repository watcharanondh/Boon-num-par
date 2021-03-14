import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import HomeMainAdmin from "@/views/HomeMainAdmin.vue";

import Menusale from "@/views/sale/Menusale.vue";
import Home from "@/views/sale/Home.vue";
import Customer from "@/views/sale/Customer.vue";
import MonitorPersonltype from "@/views/sale/MonitorPersonltype.vue";
import CreatePersoneltype from "@/views/sale/CreatePersoneltype.vue";
import EditPersoneltype from "@/views/sale/EditPersoneltype.vue";
import Quotation from "@/views/sale/Quotation.vue";
import CreateQuotation from "@/views/sale/CreateQuotation.vue";
import EditQuotation from "@/views/sale/EditQuotation.vue";
import QuotationPrint from "@/views/sale/QuotationPrint.vue";
import Equipment from "@/views/sale/Equipment.vue";
import CreateEquipment from "@/views/sale/CreateEquipment.vue";
import EditEquipment from "@/views/sale/EditEquipment.vue";
import Package from "@/views/sale/Package.vue";
import CreatePackage from "@/views/sale/CreatePackage.vue";
import EditPackage from "@/views/sale/EditPackage.vue";
import Promotion from "@/views/sale/Promotion.vue";
import CreatePromotion from "@/views/sale/CreatePromotion.vue";
import EditPromotion from "@/views/sale/EditPromotion.vue";

import Menuteambnp from "@/views/teambnp/Menuteambnp.vue";

import Eventteaminformation from "@/views/teambnp/Eventteaminformation.vue";
import Menuteambnp_eapa from "@/views/teambnp/Menuteambnp_eapa.vue";
import Workprogress from "@/views/teambnp/Workprogress.vue";
import Manageteamlists from "@/views/teambnp/Manageteamlists.vue"; 

import Explorearea from "@/views/teambnp/Explorearea.vue";
import JobExplorearea from "@/views/teambnp/JobExplorearea.vue";
import Placearrangement from "@/views/teambnp/Placearrangement.vue"; 
import JobPlacearrangement from "@/views/teambnp/JobPlacearrangement.vue"; 

import Createmanageteam from "@/views/teambnp/Createmanageteam.vue";
import Editmanageteam from "@/views/teambnp/Editmanageteam.vue"; 
import MonitorTeaminformation from "@/views/teambnp/MonitorTeaminformation.vue";
import Monitorteamlists from "@/views/teambnp/Monitorteamlists.vue";

import Customizecheck from "@/views/teambnp/Customizecheck.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login
  },

  {
    path: "/HomeMainAdmin",
    name: "HomeMainAdmin",
    component: HomeMainAdmin
  },

  // sale
  {
    path: "/sale/Menusale",
    name: "menusale",
    component: Menusale
  },
  {
    path: "/sale/Home",
    name: "salehome",
    component: Home
  },
  {
    path: "/sale/Customer",
    name: "saleCustomer",
    component: Customer
  },
  {
    path: "/sale/MonitorPersonltype",
    name: "saleMonitorPersonltype",
    component: MonitorPersonltype
  },
  {
    path: "/sale/CreatePersoneltype",
    name: "saleCreatePersoneltype",
    component: CreatePersoneltype
  },
  {
    path: "/sale/EditPersoneltype",
    name: "saleEditPersoneltype",
    component: EditPersoneltype
  },

  {
    path: "/sale/Quotation",
    name: "saleQuotation",
    component: Quotation
  },
  {
    path: "/sale/CreateQuotation",
    name: "saleCreateQuotation",
    component: CreateQuotation
  },
  {
    path: "/sale/EditQuotation",
    name: "saleEditQuotation",
    component: EditQuotation
  },
  {
    path: "/sale/QuotationPrint",
    name: "saleQuotationPrint",
    component: QuotationPrint
  },
  {
    path: "/sale/Equipment",
    name: "saleEquipment",
    component: Equipment
  },
  {
    path: "/sale/CreateEquipment",
    name: "saleCreateEquipment",
    component: CreateEquipment
  },
  {
    path: "/sale/EditEquipment",
    name: "saleEditEquipment",
    component: EditEquipment
  },
  {
    path: "/sale/Package",
    name: "salePackage",
    component: Package
  },
  {
    path: "/sale/CreatePackage",
    name: "saleCreatePackage",
    component: CreatePackage
  },
  {
    path: "/sale/EditPackage",
    name: "saleEditPackage",
    component: EditPackage
  },
  {
    path: "/sale/Promotion",
    name: "salePromotion",
    component: Promotion
  },
  {
    path: "/sale/CreatePromotion",
    name: "saleCreatePromotion",
    component: CreatePromotion
  },
  {
    path: "/sale/EditPromotion",
    name: "saleEditPromotion",
    component: EditPromotion
  },
  //จบ sale

  // Team bnp
  {
    path: "/teambnp/Menuteambnp",
    name: "menuTeambnp",
    component: Menuteambnp
  },

  {
    path: "/teambnp/Eventteaminformation",
    name: "menuEventteaminformation",
    component: Eventteaminformation
  },
  {
    path: "/teambnp/Menuteambnp_eapa",
    name: "menuTeambnp_eapa",
    component: Menuteambnp_eapa
  },

    {
      path: "/teambnp/Explorearea",
      name: "menuExplorearea",
      component: Explorearea
    },
    {
      path: "/teambnp/JobExplorearea",
      name: "menuJobExplorearea",
      component: JobExplorearea
    },
    {
      path: "/teambnp/Placearrangement",
      name: "menuPlacearrangement",
      component: Placearrangement
    },
    {
      path: "/teambnp/JobPlacearrangement",
      name: "menuJobPlacearrangement",
      component: JobPlacearrangement
    },


  {
    path: "/teambnp/Workprogress",
    name: "menuWorkprogress",
    component: Workprogress
  },
  {
    path: "/teambnp/Manageteamlists",
    name: "menuManageteamlists",
    component: Manageteamlists
  },


  {
    path: "/teambnp/MonitorTeaminformation",
    name: "menuMonitorteaminformation",
    component: MonitorTeaminformation
  },
  {
    path: "/teambnp/Createmanageteam",
    name: "menuCreatemanageteam",
    component: Createmanageteam
  },
  {
    path: "/teambnp/Monitorteamlists",
    name: "menuMonitorteamlists",
    component: Monitorteamlists
  },
  {
    path: "/teambnp/Editmanageteam",
    name: "menuEditmanageteam",
    component: Editmanageteam
  },
  {
    path: "/teambnp/Customizecheck",
    name: "menuCustomizecheck",
    component: Customizecheck
  },

  //จบ Team bnp

  {
    path: "/",
    redirect: "/Login"
  },
  {
    path: "*",
    redirect: "/Login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
