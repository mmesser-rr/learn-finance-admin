const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const createBookRequest = (athleteId, data) => unit.getAthleteUnitAccountById(data.unitAccountId).then(res => (res.data.attributes.available >= data.amount) ? 
  unit.bookPayment(data) : 
  Promise.reject(`Athlet doesn't have enough balance for this transaction ${athleteId}`)
  );

const bookPayment = (athleteId, data) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
     createBookRequest(athlete, data) : 
    Promise.reject(`No athlete found with id ${athleteId}`)
);

module.exports.plaidPayment = async (event) => {
  const {athleteId, data} = event.arguments;
   return bookPayment(athleteId, data)
}
