const { print } = require('graphql');
const gql = require('graphql-tag');

const updateAthleteUnitLookupStatement = gql`
  mutation updateAthleteUnitLookup($athleteId: ID!, $unitLookup: AthleteUnitLookupInput!) {
    updateAthlete(input: {unitLookup: $unitLookup, id: $athleteId}) {
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

const addUnitDataToAthlete = (axios) => (
  athleteId,
  unitLookup
) => axios.post("/", {
  query: print(updateAthleteUnitLookupStatement),
  variables: {
    athleteId,
    unitLookup
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(res.data.errors) : Promise.resolve(res.data.data.updateAthleteUnitLookup);

module.exports = {
  addUnitDataToAthlete
}
