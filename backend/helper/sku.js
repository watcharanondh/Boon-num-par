const Invoice = require("invoice-number");
const { STRING } = require("sequelize");

exports.SKUincrementer = (str) => {
    /* exam: BNP0000001 */
    return Invoice.InvoiceNumber.next(str);
    /* return: BNP0000002 */
}

exports.customGenerateSKU = (string, number_length) => {
    if (!string) return
    const _length = number_length ? parseInt(number_length) : 3
    const set_zero = "0".padStart(_length - 1, "0") + "1"
    return `${string.replace(/\s/g, '')}${set_zero}`;
    /* return: BNP0000002 */
}