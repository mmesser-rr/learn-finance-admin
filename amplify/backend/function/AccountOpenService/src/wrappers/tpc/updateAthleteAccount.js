const { print } = require('graphql');
const gql = require('graphql-tag');

const updateAthleteStatement = gql`
  mutation updateAthleteAccount($athleteId: ID!, $accounts: AthleteAccount!) {
    updateAthlete(input: {accounts: $accounts, id: $athleteId}) {
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

const updateAthlete = (axios) => (
  athleteId,
  data
) => axios.post("/", {
  query: print(updateAthleteStatement),
  variables: {
    athleteId,
    data
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(res.data.errors) : Promise.resolve(res.data.data.updateAthleteAccount);

module.exports = {
  updateAthlete
}
