const plaid = require("../wrappers/plaid");
const tpc = require("../wrappers/tpc");

const createToken = (athlete) => {
  const custId = athlete?.unitLookup?.custId;

  if (custId === undefined) {
    throw new Error("Athlete does not have a unit customer id. Has their unit application been approved?");
  }
  return plaid.createToken(athlete.id)
    .catch(err => {
      throw new Error(`Failed to creat link in Plaid. Reason: ${JSON.stringify(err)}`);
    });
 }

module.exports = {
    createToken: (athleteId) => tpc.getAthlete(athleteId).then(createToken)
}
