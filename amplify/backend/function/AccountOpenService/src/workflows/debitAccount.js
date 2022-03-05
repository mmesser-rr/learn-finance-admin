const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const createDebitRequest = (athleteId, data) => unit.getAthleteUnitAccountById(data.unitAccountId).then(res => (res.data.attributes.available < data.amount) ? 
  unit.debitAccount(data) : 
  Promise.reject(`Athlet doesn't have enough balance for this transaction ${athleteId}`)
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

