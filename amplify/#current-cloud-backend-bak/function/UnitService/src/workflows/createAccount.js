const unit = require("../wrappers/unit");
const tpc = require("../wrappers/tpc");

let podName = "SAVINGS";
const accountFromUnitParams = (athleteId, unitResponse) => (
  {
    athleteId,
    podName: podName,
    unitAccountId: unitResponse.data.id,
    routingCode: unitResponse.data.attributes.routingNumber,
    accountNumber: unitResponse.data.attributes.accountNumber
  }
);

const persistAccountInBackend = (athleteId, unitResponse) => tpc.persistAccount(accountFromUnitParams(athleteId, unitResponse));

const createAndPersistAccount = (athlete) => {
  const custId = athlete?.unitLookup?.custId;
  const athleteId = athlete.id;

  if (custId === undefined) {
    throw new Error("Athlete does not have a unit customer id. Has their unit application been approved?");
  }


  return unit.createAccount(custId, athleteId)
    .then(res => persistAccountInBackend(athleteId, res))
    .catch(err => {
      throw new Error(`Failed to create account in Unit. Reason: ${JSON.stringify(err)}`);
    });
}

module.exports = {
  createAndPersistAccount: (athleteId) => tpc.getAthlete(athleteId).then(createAndPersistAccount)
}
