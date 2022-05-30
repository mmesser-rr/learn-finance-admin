const { createApplication } = require("./createApplication");
const { createAccount } = require("./createAccount");
const { bookPayment } = require("./bookPayment");
const { debitAccount } = require("./debitAccount");
const { creditAccount } = require("./creditAccount");
const { plaidPayment } = require("./plaidPayment");
const { getAthleteUnitAccountById } = require("./getAthleteUnitAccountById");
const { getAllAthleteAccounts } = require("./getAllAthleteAccounts");
const {getUnitTransactionById} = require("./getUnitTransactionById");
const { unit } = require("../../env.js");

module.exports = {
  createApplication: createApplication(unit),
  createAccount: createAccount(unit),
  debitAccount: debitAccount(unit),
  getAllAthleteAccounts: getAllAthleteAccounts(unit),
  getAthleteUnitAccountById: getAthleteUnitAccountById(unit),
  creditAccount: creditAccount(unit),
  plaidPayment: plaidPayment(unit),
  getUnitTransactionById: getUnitTransactionById(unit),
  bookPayment: bookPayment(unit)
}
