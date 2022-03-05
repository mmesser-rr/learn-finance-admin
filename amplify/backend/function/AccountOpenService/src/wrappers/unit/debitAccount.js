const { Unit } = require("@unit-finance/unit-node-sdk");
const { JS } = require("aws-amplify");

const IP = "127.0.0.1";
const COUNTRY_CODE = "US";
const APPLICATION_TYPE = "achPayment";
const DIRECTION = "Debit";
const TYPE = "depositAccount";

const parseApplicationParams = (data) => ({
  type: APPLICATION_TYPE,
  attributes: {
    amount: data.amount,
    direction: DIRECTION,
    description: data.description,
    addenda: data.addenda,
    counterparty:{
      name: data.receiverName,
      routingNumber: data.receiverRoutingNumber,
      accountNumber: data.receiverAccountNumber,
      accountType: data.receiverAccountType
    }
  },
  relationships:{
    account:{
        data:{
          type: TYPE,
          id: data.unitAccountId
        }
      }
    }
});

const debitAccount = (unit) => (data) => {
  const unitParams = parseApplicationParams(data);
  return unit.payments.create(unitParams)
    .then(resultLens)
    .catch(err => Promise.reject(`Failed to submit Payment to Unit API. Error: ${err.message}`));
}

const resultLens = (res) => ({
  transactionId: res.data.id,
  status: res.data.attributes.status,
  amount: res.data.attributes.amount,
  createdAt: res.data.attributes.createdAt,
  counterparty: res.data.attributes.counterparty
});

module.exports = {
  resultLens,
  debitAccount
}
