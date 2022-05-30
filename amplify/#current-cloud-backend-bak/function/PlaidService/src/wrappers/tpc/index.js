const { getAthlete } = require("./getAthlete");
const { addPlaidToken } = require("./addPlaidToken");
const { createProcessorToken } = require("./createProcessorToken");
const env = require("../../env.js");

module.exports = {
  getAthlete: getAthlete(env.axios),
  addPlaidToken: addPlaidToken(env.axios),
  createProcessorToken: createProcessorToken(env.axios)
}
