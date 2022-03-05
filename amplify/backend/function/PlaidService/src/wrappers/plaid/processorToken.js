const paramsFromId = (accessToken, accountId) => ({
    access_token: accessToken,
    account_id: accountId,
    processor: "unit"
  });
  
  const processorToken = (plaid) => (accessToken, accountId) => {
    const params = paramsFromId(accessToken, accountId);
    return plaid.createProcessorToken({params}).then((res) => (console.log("???????>>>>>>>>>>>>>>>>", res.data)))
    .catch((error) => {
      const err = error.response.data;
      // Indicates plaid API error
      console.error('/Linking', {
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
    processorToken
}