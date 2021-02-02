const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const CustomerContrllers = require("../controllers/customers");



/*------------------------------ Customer ------------------------------*/
/* List Customer Type Selector */
router.get("/customertypeselector", authorize, CustomerContrllers.listCustomerType);

/* List All Customer */
router.get("/listallcustomers", authorize, CustomerContrllers.listAllCustomers);
/* Create New Customer */
router.post("/newcustomer", authorize, CustomerContrllers.createCustomer);
/* List Customer to Edit */
router.post("/listcustomer", authorize, CustomerContrllers.listCustomerToEdit);
/* Edit Customer */
router.put("/editcustomer", authorize, CustomerContrllers.editCustomer);
/* Delete Customer */
router.put("/delcustomer", authorize, CustomerContrllers.deleteCustomer);



/*------------------------------ Customer Tax Invoice ------------------------------*/
/* Create New Customer Tax Invoice*/
router.post("/newcustomertaxinv", authorize, CustomerContrllers.createCustomersTaxInvoice);
/* List Customer Tax Invoice to Edit */
router.get("/listcustomertaxinv", authorize, CustomerContrllers.listCustomersTaxInvoiceToEdit);
/* Edit Customer Tax Invoice */
router.put("/editcustomertaxinv", authorize, CustomerContrllers.editCustomersTaxInvoice);
/* Delete Customer Tax Invoice */
router.put("/delcustomertaxinv", authorize, CustomerContrllers.deleteCustomersTaxInvoice);

module.exports = router;
