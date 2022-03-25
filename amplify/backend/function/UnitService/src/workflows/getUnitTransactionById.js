const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const getUnitTransactionById = (unitTransactionId) => {
  return unit.getUnitTransactionById(unitTransactionId)
    .catch(err => {
      throw new Error(`Failed to reach Unit. Reason: ${JSON.stringify(err)}`);
    });
}

const getUnitTransaction = (athleteId, unitTransactionId) => tpc.getAthlete(athleteId).then(athlete => 
    (athlete != null) ? 
    getUnitTransactionById(unitTransactionId) : 
      Promise.reject(`No athlete found with id ${athleteId}`)
  )
  

module.exports = {
    getUnitTransactionById: getUnitTransaction
}
