const { print } = require('graphql');
const gql = require('graphql-tag');

const axios = require('axios');

const API_URL = process.env.API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT;
const API_KEY = process.env.API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT;

const getPhoneChallengeStatement = gql`
  query getPhoneChallenge($code: String!, $phoneNumber: String!) {
    getPhoneChallenge(code: $code, phoneNumber: $phoneNumber) {
      verified
      phoneNumber
      code
    }
  }
`

const verifyPhoneChallengeStatement = gql`
  mutation updatePhoneChallenge($phoneNumber: String!, $code: String!) {
    updatePhoneChallenge(input: {verified: true, phoneNumber: $phoneNumber, code: $code}, condition: {verified: {eq: false}}) {
      code
      verified
      phoneNumber
    }
  }
`

const createPhoneChallengeStatement = gql`
  mutation createPhoneChallenge($input: CreatePhoneChallengeInput!) {
    createPhoneChallenge(input: $input) {
      code,
      verified,
      phoneNumber,
      updatedAt,
      createdAt
    }
  }
`

const phoneNumberHasChallengeStatement = gql`
  query listPhoneChallenges($phoneNumber: String!) {
    listPhoneChallenges(filter: {phoneNumber: {eq: $phoneNumber}}) {
      items {
        verified
        phoneNumber
        code
      }
    }
  }
`

const graphqlRequest = (data) => axios({
    url: API_URL,
    method: 'post',
    headers: {
      'x-api-key': API_KEY,
    },
    data: data
  })

const persistChallenge = async (challenge) => graphqlRequest({
    query: print(createPhoneChallengeStatement),
    variables: {
      input: challenge
    }
  })
  .then(result => result.data.data.createPhoneChallenge);

const phoneNumberHasChallenge = async (phoneNumber) => graphqlRequest({
    query: print(phoneNumberHasChallengeStatement),
    variables: {
      phoneNumber: phoneNumber
    }
  })
  .then(result => result.data.data.listPhoneChallenges.items.length > 0);

const getPhoneChallenge = async (code, phoneNumber) => graphqlRequest({
    query: print(getPhoneChallengeStatement),
    variables: {
      code: code,
      phoneNumber: phoneNumber
    }
  })
  .then(result => result.data.data.getPhoneChallenge)

const verifyPhoneChallenge = async (code, phoneNumber) => graphqlRequest({
    query: print(verifyPhoneChallengeStatement),
    variables: {
      code: code,
      phoneNumber: phoneNumber
    }
  })
  .then(result => result.data.data.updatePhoneChallenge);

module.exports = {
  persistChallenge,
  getPhoneChallenge,
  verifyPhoneChallenge,
  phoneNumberHasChallenge
}
