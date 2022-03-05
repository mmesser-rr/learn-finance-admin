const { persistAccount } = require("./persistAccount");
const { addUnitDataToAthlete } = require("./addUnitDataToAthlete");
const { getAthlete } = require("./getAthlete");
const env = require("../../env.js");

module.exports = {
  persistAccount: persistAccount(env.axios),
  addUnitDataToAthlete: addUnitDataToAthlete(env.axios),
  getAthlete: getAthlete(env.axios)
}
