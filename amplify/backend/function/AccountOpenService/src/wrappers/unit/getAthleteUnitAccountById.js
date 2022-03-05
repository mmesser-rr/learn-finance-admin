const getAthleteUnitAccountById = (unit) => (unitAccountId) => {
    return unit.accounts.get(unitAccountId);
  };
  
  module.exports = {
    getAthleteUnitAccountById
  }
  