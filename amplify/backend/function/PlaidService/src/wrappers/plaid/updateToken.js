const paramsFromId = (accessToken) => ({
  public_token: accessToken
});

const updateToken = (plaid) => (accessToken) => {
  const param = paramsFromId(accessToken);
  return plaid.itemPublicTokenExchange(param).then((res) => (res.data))
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
  updateToken
}