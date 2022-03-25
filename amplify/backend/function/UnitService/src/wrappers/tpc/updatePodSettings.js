const { print } = require('graphql');
const gql = require('graphql-tag');

const updateAthletePodSettingsStatement = gql`
  mutation updateAthletePodSettingsLookup($athleteId: ID!, $podSettings: PodSettingsInput!) {
    updateAthlete(input: {podSettings: $podSettings, id: $athleteId}) {
      createdAt
      id
      isActive
      lastName
      level
      mobilePhone 
    }
  } 
`

const updatePodSettings = (axios) => (
  athleteId,
  podSettings
) => axios.post("/", {
  query: print(updateAthletePodSettingsStatement),
  variables: {
    athleteId,
    podSettings
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(res.data.errors) : Promise.resolve(res.data.data.updateAthletePodSettingsLookup);

module.exports = {
  updatePodSettings
}