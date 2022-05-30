const getAllUnitTransaction = (unit) => (custId) => {
    return unit.transactions.list({customerId: custId}).then(res => res.data)
  };
  
  module.exports = {
    getAllUnitTransaction
  }
  