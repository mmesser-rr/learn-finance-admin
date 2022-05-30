const plaid = require("../wrappers/plaid");
const tpc = require("../wrappers/tpc");

const processorToken = (token, plaidAccount) => {

    if (plaidAccount === undefined) {
      throw new Error("Looks like this athlete have any account linked");
    }


  return plaid.processorToken(token, plaidAccount)
    .catch(err => {
      throw new Error(`Failed to creat link in Plaid. Reason: ${JSON.stringify(err)}`);
    });
}

module.exports.processorToken = async (plaidAccount, token) => {
     return processorToken(token, plaidAccount)
}
  