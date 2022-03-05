const getUnitTransactionById = (unit) => (unitTransactionId) => {
    return unit.transactions.get(unitTransactionId);
  };
  
  module.exports = {
    getUnitTransactionById
  }
  