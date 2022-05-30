const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const getAthleteUnitAccountById = (athlete, unitAccountId) => {
  const accounts = athlete.accounts.items;

  if (accounts.length !== 0 && !accounts.some(i => i.unitAccountId.includes(unitAccountId))) {
    throw new Error("Athlete does not doesn't match?");
  }

  return unit.getAthleteUnitAccountById(unitAccountId)
    .catch(err => {
      throw new Error(`Failed to reach Unit. Reason: ${JSON.stringify(err)}`);
    });
}

const getAthleteUnitAccount = (athleteId, unitAccountId) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
  getAthleteUnitAccountById(athlete, unitAccountId) : 
    Promise.reject(`No athlete found with id ${athleteId}`)
)

module.exports = {
  getAthleteUnitAccountById: getAthleteUnitAccount
}


