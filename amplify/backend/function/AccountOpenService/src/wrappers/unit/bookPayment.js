//Internal transactions between unit accounts
const { Unit } = require("@unit-finance/unit-node-sdk");

const IP = "127.0.0.1";
const COUNTRY_CODE = "US";
const APPLICATION_TYPE = "bookPayment";
const DIRECTION = "Credit";
const TYPE = "depositAccount";

const parseApplicationParams = (data) => ({
  type: APPLICATION_TYPE,
  attributes: {
    amount: data.amount,
    direction: DIRECTION,
    description: data.description
  },
  relationships:{
      account:{
          data:{
            type: TYPE,
            id: data.unitAccountId
          }
        },
      counterpartyAccount:{
          data:{
            type: data.receiverAccountType,
            id:data.receiverUnitAccountId
          }
      }
   }
});


const bookPayment = (unit) => (data) => {
  const unitParams = parseApplicationParams(data);
  return unit.payments.create(unitParams)
    .then(resultLens)
    .catch(err => Promise.reject(`Failed to submit payment to Unit API. Error: ${err.message}`));
}

const resultLens = (res) => ({
  transactionId: res.id,
  status: res.attributes.status,
  createdAt: res.attributes.createdAt,
  counterparty: res.attributes.counterparty
});

module.exports = {
  resultLens,
  bookPayment
}