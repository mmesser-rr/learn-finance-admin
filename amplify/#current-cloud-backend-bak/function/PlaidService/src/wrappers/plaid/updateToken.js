const paramsFromId = (publicToken) => ({
  public_token: publicToken
});

const updateToken = (plaid) => (publicToken) => {
  const param = paramsFromId(publicToken);
  return plaid.itemPublicTokenExchange(param)
  .then((tokenResponse) => (tokenResponse.data.access_token))
  .catch((error) => {
    const err = error.response.data;
    // Indicates plaid API error
    console.error('/Linking update', {
      error_type: err.error_type,
      error_code: err.error_code,
      error_message: err.error_message,
      display_message: err.display_message,
      documentation_url: err.documentation_url,
      request_id: err.request_id,
    });
  })
};

const resultLens = (res) => ({
    accessToken: res
});

module.exports = {
  updateToken
}

