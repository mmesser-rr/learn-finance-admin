const paramsFromId = (athleteId) => ({
    client_name: "TPC",
    country_codes: ["US"],
    language: "en",
    user:{
        client_user_id: athleteId
    },
    products: ["auth", "transactions"]
  });
  
  const createToken = (plaid) => (athleteId) => {
    const LinkTokenCreateRequest = paramsFromId(athleteId);

  return plaid.linkTokenCreate(LinkTokenCreateRequest).then((res) => (res.data))
  .catch((error) => {
    const err = error.response.data;
    // Indicates plaid API error
    console.error('/Linking error', {
      error_type: err.error_type,
      error_code: err.error_code,
      error_message: err.error_message,
      display_message: err.display_message,
      documentation_url: err.documentation_url,
      request_id: err.request_id,
    });})
  };
  
  module.exports = {
    createToken
  }
  //.then(data => {data.link_token})
  // .then((tokenResponse) => tokenResponse.access_token)
  // .then((accessToken) => plaidClient.accountsGet({ accessToken }))
  // .then((accountsResponse) => console.log(accountsResponse.accounts))