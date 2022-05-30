const getUnitTransactionById = (unit) => (unitTransactionId) => {
    return unit.transactions.get(unitTransactionId).then(res => res.data)
  };
  
  module.exports = {
    getUnitTransactionById
  }
  