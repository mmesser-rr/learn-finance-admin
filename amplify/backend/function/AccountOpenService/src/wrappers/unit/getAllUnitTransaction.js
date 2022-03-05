const getAllUnitTransaction = (unit) => (unitAccountId) => {
    return unit.transactions.get(unitAccountId);
  };
  
  module.exports = {
    getAllUnitTransaction
  }
  