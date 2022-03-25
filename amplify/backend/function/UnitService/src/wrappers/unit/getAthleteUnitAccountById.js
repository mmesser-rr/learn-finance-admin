const getAthleteUnitAccountById = (unit) => (unitAccountId) => {
    return unit.accounts.get(unitAccountId).then(res => res.data)
  };
  
  module.exports = {
    getAthleteUnitAccountById
  }
  