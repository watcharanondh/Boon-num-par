const express = require("express");
const router = express.Router();

const CustomerContrllers = require("../controllers/customers");



/*------------------------------ Customer ------------------------------*/
/* List Customer Type Selector */
router.get("/customertypeselector", CustomerContrllers.List_Customer_type);

/* List All Customer */
router.get("/listallcustomers", CustomerContrllers.List_All_Customer);
/* Create New Customer */
router.post("/newcustomer", CustomerContrllers.Create_customer);
/* List Customer to Edit */
router.post("/listcustomer", CustomerContrllers.List_Customer_to_Edit);
/* Edit Customer */
router.put("/editcustomer", CustomerContrllers.Edit_customer);
/* Delete Customer */
router.put("/delcustomer", CustomerContrllers.Delete_customer);



/*------------------------------ Customer Tax Invoice ------------------------------*/
/* Create New Customer Tax Invoice*/
router.post("/newcustomertaxinv", CustomerContrllers.Create_customers_tax_invoice);
/* List Customer Tax Invoice to Edit */
router.get("/listcustomertaxinv", CustomerContrllers.List_customers_tax_invoice_to_Edit);
/* Edit Customer Tax Invoice */
router.put("/editcustomertaxinv", CustomerContrllers.Edit_customers_tax_invoice);
/* Delete Customer Tax Invoice */
router.put("/delcustomertaxinv", CustomerContrllers.Delete_customers_tax_invoice);

module.exports = router;
