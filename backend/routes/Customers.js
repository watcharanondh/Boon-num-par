const express = require("express");
const router = express.Router();

const CustomerContrllers = require("../controllers/customers");



/*------------------------------ Customer ------------------------------*/
/* List Customer Type Selector */
router.get("/customertypeselector", CustomerContrllers.listCustomerType);

/* List All Customer */
router.get("/listallcustomers", CustomerContrllers.listAllCustomer);
/* Create New Customer */
router.post("/newcustomer", CustomerContrllers.createCustomer);
/* List Customer to Edit */
router.post("/listcustomer", CustomerContrllers.listCustomerToEdit);
/* Edit Customer */
router.put("/editcustomer", CustomerContrllers.editCustomer);
/* Delete Customer */
router.put("/delcustomer", CustomerContrllers.deleteCustomer);



/*------------------------------ Customer Tax Invoice ------------------------------*/
/* Create New Customer Tax Invoice*/
router.post("/newcustomertaxinv", CustomerContrllers.createCustomersTaxInvoice);
/* List Customer Tax Invoice to Edit */
router.get("/listcustomertaxinv", CustomerContrllers.listCustomersTaxInvoiceToEdit);
/* Edit Customer Tax Invoice */
router.put("/editcustomertaxinv", CustomerContrllers.editCustomersTaxInvoice);
/* Delete Customer Tax Invoice */
router.put("/delcustomertaxinv", CustomerContrllers.deleteCustomersTaxInvoice);

module.exports = router;
