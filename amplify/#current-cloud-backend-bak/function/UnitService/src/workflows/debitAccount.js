const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const createDebitRequest = (athlete, data) => unit.getAthleteUnitAccountById(data.unitAccountId).then(res => (res.attributes.available < data.amount) ? 
  unit.debitAccount(data)
  .then(res => tpc.persistTransaction(res.transactionId, athlete.id, res.amount, res.status, res.createdAt, false, res.direction, athlete.podSettings)):
  Promise.reject(`Athlet doesn't have enough balance for this transaction ${athlete.id}`)
  );

const debitAccount = (athleteId, data) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
    createDebitRequest(athlete, data) : 
    Promise.reject(`No athlete found with id ${athleteId}`)
);

module.exports.debitAccount = async (event) => {
  const {athleteId, data} = event.arguments;
   return debitAccount(athleteId, data)
}

