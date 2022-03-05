const { updateToken } = require("./updateToken");
const { createToken } = require("./createToken");
// const { processorToken } = require("./processorToken");
// const {getPlaidAccount} = require("./getPlaidAccount");
const { plaid } = require("../../env");

module.exports = {
    updateToken: updateToken(plaid),
    createToken: createToken(plaid),
    // processorToken: processorToken(plaid),
    // getPlaidAccount: getPlaidAccount(plaid)
}
