const plaid = require("../wrappers/plaid");
const tpc = require("../wrappers/tpc");

const processorToken = (athleteId, token, accountId) => {
    const custId = athlete?.unitLookup?.custId;;
    if (custId === undefined) {
      throw new Error("Looks like this athlete haven't linked plaid");
    }
  return plaid.processorToken(athleteId, token, accountId)
    .catch(err => {
      throw new Error(`Failed to creat link in Plaid. Reason: ${JSON.stringify(err)}`);
    });
}

module.exports.processorToken = async (event) => {
    const {athleteId, accessToken, accountId} = event.arguments;
     return processorToken(athleteId, accessToken, accountId)
}
  