const getPlaidAccount = (plaid) => (accessToken) => {
    const params = paramsFromId(accessToken);
    return plaid.accountsGet({ access_token });
  };
  
  module.exports = {
    getPlaidAccount
  }