const express = require("express");
const router = express.Router();

const QuotationsContrllers = require("../controllers/quotations");

/*------------------------------ Create Quatation ------------------------------*/
/* List All Quotations */
router.get("/listallquotations", QuotationsContrllers.listAllQuotations);
/* Update Quotation Confirm Status */
router.put("/confirmquotstat", QuotationsContrllers.comfirmQuotationStatus);
/* List Customer information to Create Quotations */
router.post("/findcustomerinfo", QuotationsContrllers.listFindCustomerInformation);
/* Select Package to Create Quotations */
router.post("/selectpackage", QuotationsContrllers.selectPackage);
/* List All Promotions to Create Quotations */
router.get("/listallpromotions", QuotationsContrllers.listAllPromotions);
/* Create New Quotations */
router.post("/newquotations", QuotationsContrllers.createNewQuotation);

/*------------------------------ Edit Quatation ------------------------------*/
/* List Quotations to Edit */
router.post("/listquotation", QuotationsContrllers.listQuotationsToEdit);
/* Edit Quotation */
router.put("/editquotation", QuotationsContrllers.editQuotation);

/*------------------------------ Edit Quatation ------------------------------*/
/* Edit Quotation */
router.put("/delquotation", QuotationsContrllers.deleteQuotation);
module.exports = router;
