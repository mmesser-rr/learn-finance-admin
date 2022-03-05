const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const createCreditRequest = (athleteId, data) => unit.getAthleteUnitAccountById(data.unitAccountId).then(res => (res.data.attributes.available < data.amount) ? 
  unit.creditAccount(data) : 
  Promise.reject(`Athlet doesn't have enough balance for this transaction ${athleteId}`)
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

