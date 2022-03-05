const paramsFromCustId = (custId, athleteId) => ({
  type: "depositAccount",
  attributes: {
    "depositProduct": "checking",
    "tags": {
      "purpose": "checking",
      "athleteId": athleteId
    }
  },
  relationships: {
    "customer": {
      "data": {
        "type": "customer",
        "id": custId
      }
    }
  }
});

const createAccount = (unit) => (custId, athleteId) => {
  const params = paramsFromCustId(custId, athleteId);
  return unit.accounts.create(params);
};

module.exports = {
  createAccount
}
