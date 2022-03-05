const plaid = require("../wrappers/plaid");
const tpc = require("../wrappers/tpc");
const createProcessorToken = require("./processorToken");

const tokenFromPlaidParams = (athleteId, plaidResponse) => (
  {
    athleteId,
    unitAccountId: plaidResponse.data.id,
    routingCode: plaidResponse.data.attributes.routingNumber,
    accountNumber: plaidResponse.data.attributes.accountNumber
  }
);
const updatePlaidBackend = (athleteId, plaidResponse) => tpc.addPlaidToken(tokenFromPlaidParams(athleteId, plaidResponse));


const updateToken = (athleteId, token) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete?.unitLookup?.custId != null) ? 
      plaid.updateToken(token)
      .then(res => createProcessorToken(res.access_token))
      .then(res => updatePlaidBackend(athleteId, res)) : 
      Promise.reject(`Athlete doesn't have account ${athleteId}`)
);

module.exports.updateToken = async (event) => {
  const {athleteId, accessToken} = event.arguments;
   return updateToken(athleteId, accessToken)
}

