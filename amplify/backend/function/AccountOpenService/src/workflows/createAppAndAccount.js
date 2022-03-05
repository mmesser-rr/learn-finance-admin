const { createAndPersistAccount } = require("./createAccount");
const { repeat, map } = require("ramda");
const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

const NO_OF_ACCOUNTS = 3;

const createAppAndAccount = (ssn, athlete) => {
  const custId = athlete?.unitLookup?.custId;

  if (custId) {
    throw new Error("Looks like this athlete is already affiliated with a Unit customer. Continuing will overwrite and lose current unit data. Bailing");
  }

  return unit.createApplication(ssn, athlete)
    .catch(err => (err?.appId) ?
      Promise.reject(tpc.addUnitDataToAthlete(athlete.id, err))
      : Promise.reject(err)
    )

    .then(res => tpc.addUnitDataToAthlete(athlete.id, res))
    .then(res => Promise.all(
      map(
        fn => fn(athlete.id), 
        repeat(
          createAndPersistAccount,
          NO_OF_ACCOUNTS
        )
      )
    ));
}

const createAppAndAccountFromId = (ssn, athleteId) => tpc.getAthlete(athleteId).then(athlete => 
  (athlete != null) ? 
    createAppAndAccount(ssn, athlete) : 
    Promise.reject(`No athlete found with id ${athleteId}`)
);

module.exports = {
  createAppAndAccount: createAppAndAccountFromId
}
