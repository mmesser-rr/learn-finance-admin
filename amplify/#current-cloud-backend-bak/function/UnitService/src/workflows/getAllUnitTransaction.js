const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const getUnitAllTransactions = (unitAccountId) => {
  return unit.getAllUnitTransaction(unitAccountId)
    .catch(err => {
      throw new Error(`Failed to reach Unit. Reason: ${JSON.stringify(err)}`);
    });
}

const getUnitTransactions = (athleteId, unitAccountId) => tpc.getAthlete(athleteId).then(athlete => 
    (athlete != null) ? 
    getUnitAllTransactions(unitAccountId) : 
      Promise.reject(`No athlete found with id ${athleteId}`)
  )
  

module.exports = {
    getAllUnitTransaction: getUnitTransactions
}
