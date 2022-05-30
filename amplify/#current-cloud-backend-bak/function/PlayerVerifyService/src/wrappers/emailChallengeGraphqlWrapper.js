const { print } = require('graphql');
const gql = require('graphql-tag');

const axios = require('axios');

const API_URL = process.env.API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT;
const API_KEY = process.env.API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT;

const getEmailChallengeStatement = gql`
  query getEmailChallenge($code: String!, $email: String!) {
    getEmailChallenge(code: $code, email: $email) {
      verified
      email
      code
    }
  }
`
const verifyEmailChallengeStatement = gql`
  mutation updateEmailChallenge($email: String!, $code: String!) {
    updateEmailChallenge(input: {verified: true, email: $email, code: $code}, condition: {verified: {eq: false}}) {
      code
      verified
      email
    }
  }
`

const createEmailChallengeStatement = gql`
  mutation createEmailChallenge($input: CreateEmailChallengeInput!) {
    createEmailChallenge(input: $input) {
      code,
      verified,
      email,
      updatedAt,
      createdAt
    }
  }
`

const emailHasChallengeStatement = gql`
  query listEmailChallenges($email: String!) {
    listEmailChallenges(filter: {email: {eq: $email}}) {
      items {
        verified
        email
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

const persistEmailChallenge = async (challenge) => graphqlRequest({
    query: print(createEmailChallengeStatement),
    variables: {
      input: challenge
    }
  })
  .then(result => result.data.data.createEmailChallenge);

const emailHasChallenge = async (email) => graphqlRequest({
    query: print(emailHasChallengeStatement),
    variables: {
      email: email
    }
  })
  .then(result => result.data.data.listEmailChallenges.items.length > 0);

const getEmailChallenge = async (code, email) => graphqlRequest({
    query: print(getEmailChallengeStatement),
    variables: {
      code: code,
      email: email
    }
  })
  .then(result => result.data.data.getEmailChallenge)

const verifyEmailChallenge = async (code, email) => {
  console.log(code);
  console.log(email);
  return graphqlRequest({
    query: print(verifyEmailChallengeStatement),
    variables: {
      code: code,
      email: email
    }
  })
  .then(result => {
    console.log(result);
    console.log(result.data);
    result.data.data.updateEmailChallenge;
  });
}

module.exports = {
  persistEmailChallenge,
  getEmailChallenge,
  verifyEmailChallenge,
  emailHasChallenge
}
