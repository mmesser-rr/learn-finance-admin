const { persistAccount } = require("./persistAccount");
const { addUnitDataToAthlete } = require("./addUnitDataToAthlete");
const {updatePodSettings} = require("./updatePodSettings");
const { getAthlete } = require("./getAthlete");
const {updateAthlete} = require("./updateAthleteAccount");
const {updateTransaction} = require("./updateTransaction");
const {createProcessorToken} = require("./createProcessorToken")
const {persistTransaction} = require("./persistTransaction");
const env = require("../../env.js");

module.exports = {
  persistAccount: persistAccount(env.axios),
  addUnitDataToAthlete: addUnitDataToAthlete(env.axios),
  updatePodSettings: updatePodSettings(env.axios),
  createProcessorToken : createProcessorToken(env.plaid),
  updateAthleteAccount: updateAthlete(env.axios),
  updateTransaction: updateTransaction(env.axios),
  persistTransaction: persistTransaction(env.axios),
  getAthlete: getAthlete(env.axios)
}
