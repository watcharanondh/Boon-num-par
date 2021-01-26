const Invoice = require("invoice-number");

exports.SKUincrementer = (str) => {
/* exam: BNP0000001 */
return Invoice.InvoiceNumber.next(str);
/* return: BNP0000002 */
}