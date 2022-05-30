const plaid = require("../wrappers/plaid");
const tpc = require("../wrappers/tpc");

const getPlaidAccounts = (athlete) => {
    const token = athlete?.plaidToken;
    if (!token) {
        throw new Error("Looks like this athlete haven't linked plaid, use the createLink");
      }
    
  return plaid.getPlaidAccount(token)
    .catch(err => {
      throw new Error(`Failed to creat link in Plaid. Reason: ${JSON.stringify(err)}`);
    });
}

module.exports = {
    getPlaidAccounts: (athleteId) => tpc.getAthlete(athleteId).then(getPlaidAccounts)
}


