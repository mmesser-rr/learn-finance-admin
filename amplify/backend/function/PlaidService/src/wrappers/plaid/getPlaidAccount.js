const paramsFromId = (accessToken) => ({
  access_token: accessToken
});

const getPlaidAccount = (plaid) => (accessToken) => {
    const params = paramsFromId(accessToken);
    return plaid.accountsGet(params).then(res => res.data.accounts)
    .catch((error) => {
      const err = error.response.data;
      // Indicates plaid API error
      console.error('/Get Plaid Accounts', {
        error_type: err.error_type,
        error_code: err.error_code,
        error_message: err.error_message,
        display_message: err.display_message,
        documentation_url: err.documentation_url,
        request_id: err.request_id,
      });
    })
  };

  
  module.exports = {
    getPlaidAccount
  }

  // .then((accessToken) => (token = accessToken))
  // .then((token) => plaid.accountsGet({access_token: token }))
  // .then((accountsResponse) => ({accounts: accountsResponse.data.accounts, token: token}))