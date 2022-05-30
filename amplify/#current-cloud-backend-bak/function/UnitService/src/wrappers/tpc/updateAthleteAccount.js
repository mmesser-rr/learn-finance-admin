const { print } = require('graphql');
const gql = require('graphql-tag');

const updateAthleteStatement = gql`
  mutation updateAthleteAccount($athleteId: ID!, $plaidProcessorToken: ProcessorTokenInput!) {
    updateAthlete(input: {plaidProcessorToken: $plaidProcessorToken, id: $athleteId}) {
      email
      firstName
      createdAt
      id
      isActive
      lastName
      level
      mobilePhone
      plaidProcessorToken{
        processorToken
      }
    }
  } 
`

const updateAthlete = (axios) => (
  athleteId,
  plaidProcessorToken
) => axios.post("/", {
  query: print(updateAthleteStatement),
  variables: {
    athleteId,
    plaidProcessorToken
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(res.data.errors) : Promise.resolve(res.data.data.updateAthlete.plaidProcessorToken.processorToken);

module.exports = {
  updateAthlete
}
