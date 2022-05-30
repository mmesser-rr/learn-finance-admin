const { print } = require('graphql');
const gql = require('graphql-tag');

const persistAccountStatement = gql`
  mutation createAthleteAccount($athleteId: ID!, $routingCode: String!, $accountNumber: String!, $unitAccountId: String!, $podName: String!) {
    createAthleteAccount(
      input: {routingCode: $routingCode, accountNumber: $accountNumber, athleteAccountsId: $athleteId, unitAccountId: $unitAccountId,podName: $podName}
    ) {
      accountNumber,
      athleteAccountsId,
      id,
      createdAt,
      updatedAt,
      routingCode,
      unitAccountId,
      podName
    }
  } 
`

const persistAccount = (axios) => (
  {
    athleteId,
    routingCode,
    accountNumber,
    unitAccountId,
    podName
  }
) => axios.post("/", {
  query: print(persistAccountStatement),
  variables: {
    athleteId,
    routingCode,
    accountNumber,
    unitAccountId,
    podName
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(res.data.errors) : Promise.resolve(res.data.data.createAthleteAccount);

module.exports = {
  persistAccount
}
