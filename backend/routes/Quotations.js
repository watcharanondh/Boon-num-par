const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');

const QuotationsContrllers = require("../controllers/quotations");

/*------------------------------ Create Quatation ------------------------------*/
/* List All Quotations */
router.get("/listallquotations", authorize, QuotationsContrllers.listAllQuotations);
/* List Status Quotations Selector */
router.get("/statusquotationtoselect", authorize, QuotationsContrllers.listStatusQuotations);
/* Update Quotation Confirm Status */
router.put("/confirmquotstat", authorize, QuotationsContrllers.comfirmQuotationStatus);
/* List Customer information to Create Quotations */
router.post("/findcustomerinfo", authorize, QuotationsContrllers.listFindCustomerInformation);
/* Select Package to Create Quotations */
router.post("/selectpackage", authorize, QuotationsContrllers.selectPackage);
/* List All Promotions to Create Quotations */
router.get("/listallpromotions", authorize, QuotationsContrllers.listAllPromotions);
/* Create New Quotations */
router.post("/newquotations", authorize, QuotationsContrllers.createNewQuotation);

/*------------------------------ Edit Quatation ------------------------------*/
/* List Quotations to Edit */
router.post("/listquotation", authorize, QuotationsContrllers.listQuotationsToEdit);
/* Edit Quotation */
router.put("/editquotation", authorize, QuotationsContrllers.editQuotation);

/*------------------------------ Edit Quatation ------------------------------*/
/* Edit Quotation */
router.put("/delquotation", authorize, QuotationsContrllers.deleteQuotation);

/*------------------------------ Print Quatation ------------------------------*/
/* Print Quotation */
router.post("/printquotation", authorize, QuotationsContrllers.printOutQuotation);
module.exports = router;
