const getAllAthleteAccounts = (unit) => (custId) => {
    return unit.accounts.list(custId);
  };
  
  module.exports = {
    getAllAthleteAccounts
  }
  