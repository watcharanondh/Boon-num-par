const express = require("express");
const router = express.Router();

const CustomerContrllers = require("../controllers/customers");

/* List Customer Type Selector */
router.get("/customertypeselector", CustomerContrllers.List_Customer_type);

/* List All Customer */
router.post("/listallcustomer", CustomerContrllers.List_All_Customer);

/* Create New Customer */
router.post("/newcustomer", CustomerContrllers.Create_customers);
/* Create New Customer Tax Invoice*/
router.post("/newcustomertaxinv", CustomerContrllers.Create_customers_tax_invoice);

module.exports = router;
