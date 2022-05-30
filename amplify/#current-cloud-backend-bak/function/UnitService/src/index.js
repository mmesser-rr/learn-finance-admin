/* Amplify Params - DO NOT EDIT
	API_THEPLAYERSCOMPANY_ATHLETEACCOUNTTABLE_ARN
	API_THEPLAYERSCOMPANY_ATHLETEACCOUNTTABLE_NAME
	API_THEPLAYERSCOMPANY_ATHLETETABLE_ARN
	API_THEPLAYERSCOMPANY_ATHLETETABLE_NAME
	API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIIDOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT
	FUNCTION_PLAIDSERVICE_NAME
	FUNCTION_PLAYERVERIFYSERVICE_NAME
Amplify Params - DO NOT EDIT */
const { createAndPersistAccount } = require("./workflows/createAccount.js");
const { createAppAndAccount } = require("./workflows/createAppAndAccount");
const { debitAccount } = require("./workflows/debitAccount.js");
const { creditAccount } = require("./workflows/creditAccount");
const { bookPayment } = require("./workflows/bookPayment");
const { plaidPayment } = require("./workflows/plaidPayment");
const {podSettings} = require("./workflows/podSettings");
const { getAthleteUnitAccounts } = require("./workflows/getAllAccounts");
const {getAthleteUnitAccountById} = require("./workflows/getAthleteAccountById");
const {getUnitTransactionById} = require("./workflows/getUnitTransactionById");
const {getAllUnitTransaction} = require("./workflows/getAllUnitTransaction");
const {unitWebhook} = require("./workflows/unitWebhook");

const resolvers = Object.freeze({
  openAccount: (event) => createAndPersistAccount(event.arguments.athleteId),
  bookPayment: (event) => bookPayment(event),
  debitAccount: (event) => debitAccount(event),
  creditAccount: (event) => creditAccount(event),
  createPlaidPayment: (event) => plaidPayment(event),
  podSettings: (event) => podSettings(event),
  unitWebhookService: (event) => unitWebhook(event),
  getUnitTransactionById: (event) => getUnitTransactionById(event.arguments.athleteId, event.arguments.unitTransactionId),
  listAllUnitTransactions: (event) => getAllUnitTransaction(event.arguments.athleteId, event.arguments.unitAccountId ),

  listAthletUnitAccounts: (event) => getAthleteUnitAccounts(event.arguments.athleteId),
  getAthleteUnitAccountById: (event) => getAthleteUnitAccountById(event.arguments.athleteId, event.arguments.unitAccountId),
  openAppAndAccount: (event) => createAppAndAccount(event.arguments.ssn, event.arguments.athleteId)
});


const fallback = (event) => Promise.reject(`No handler defined for fieldName: ${event.fieldName}`);

exports.handler = async (event) => (resolvers[event.fieldName] || fallback)(event);


