const getAllAthleteAccounts = (unit) => (custId) => {
    return unit.accounts.list({customerId: custId}).then(res => res.data)
  };
  
  module.exports = {
    getAllAthleteAccounts
  }
