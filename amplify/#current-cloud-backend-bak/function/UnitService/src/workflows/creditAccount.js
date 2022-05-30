const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const createCreditRequest = (athlete, data) => unit.getAthleteUnitAccountById(data.unitAccountId).then(res => (res.attributes.available < data.amount) ? 
  unit.creditAccount(data)
  .then(res => tpc.persistTransaction(res.transactionId, athlete.id, res.amount, res.status, res.createdAt, false, res.direction, athlete.podSettings)): 
  Promise.reject(`Athlet doesn't have enough balance for this transaction ${athlete.id}`)
  );

const creditAccount = (athleteId, data) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
    createCreditRequest(athlete, data) : 
    Promise.reject(`No athlete found with id ${athleteId}`)
);

module.exports.creditAccount = async (event) => {
  const {athleteId, data} = event.arguments;
   return creditAccount(athleteId, data)
}