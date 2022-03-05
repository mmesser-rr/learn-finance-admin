const tpc = require("../wrappers/tpc");

const podSettingsUpdate = (data, athleteId) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
    tpc.addUnitDataToAthlete(athleteId, data) : 
    Promise.reject(`No athlete found with id ${athleteId}`)
);

module.exports = {
    podSettings: podSettingsUpdate
}
