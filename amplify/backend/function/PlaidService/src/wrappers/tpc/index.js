const { getAthlete } = require("./getAthlete");
const env = require("../../env.js");

module.exports = {
  getAthlete: getAthlete(env.axios)
}
