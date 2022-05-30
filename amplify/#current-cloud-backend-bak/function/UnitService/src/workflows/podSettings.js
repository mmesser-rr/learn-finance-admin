const tpc = require("../wrappers/tpc");

const podSettingsUpdate = (athleteId, savings, investments, spending) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
    checkPodData(savings, investments, spending, athleteId): 
    Promise.reject(`No athlete found with id ${athleteId}`)
);

const checkPodData = (savings, investments, spending, athleteId) => {
   const totalPod = savings + investments + spending;
   if(totalPod != 100){
    Promise.reject(`Invalid pod settings ${athleteId}`)
   }
   const podSettings = ({
    SAVINGS: savings,
    INVESTMENTS: investments,
    SPENDING: spending
    });
  return tpc.updatePodSettings(athleteId, podSettings)
}
module.exports.podSettings = async (event) => {
  const {athleteId, savings, investments, spending} = event.arguments;
  return podSettingsUpdate(athleteId, savings, investments, spending)
}
