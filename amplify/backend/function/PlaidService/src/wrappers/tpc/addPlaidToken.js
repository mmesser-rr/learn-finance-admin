const { print } = require('graphql');
const gql = require('graphql-tag');

const updateAthletePlaidLookupStatement = gql`
  mutation updateAthletePlaidLookup($athleteId: ID!, $plaidLookup: AthletePlaidLookupInput!) {
    updateAthlete(input: {plaidLookup: $plaidLookup, id: $athleteId}) {
      email
      firstName
      createdAt
      id
      isActive
      lastName
      level
      mobilePhone
    }
  } 
`

const addPlaidToken = (axios) => (
  athleteId,
  plaidLookup
) => axios.post("/", {
  query: print(updateAthletePlaidLookupStatement),
  variables: {
    athleteId,
    plaidLookup
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(res.data.errors) : Promise.resolve(res.data.data.updateAthletePlaidLookup);

module.exports = {
  addPlaidToken
}
