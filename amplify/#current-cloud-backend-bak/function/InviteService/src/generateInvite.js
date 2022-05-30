/* Amplify Params - DO NOT EDIT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIIDOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT
	API_THEPLAYERSCOMPANY_INVITETABLE_ARN
	API_THEPLAYERSCOMPANY_INVITETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const InviteStatus = require("./models/InviteStatus.js");
const { print } = require('graphql');
const gql = require('graphql-tag');

const axios = require('axios');

const DEFAULT_STATUS = InviteStatus.AVAILABLE;

const API_URL = process.env.API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT;
const API_KEY = process.env.API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT;

const genCode = () => Math.random().toString(36).substr(2, 6);

const createInviteStatement = gql`
  mutation createInvite($input: CreateInviteInput!) {
    createInvite(input: $input) {
      code,
      status,
      updatedAt,
      createdAt
    }
  }
`

const persistInvite = async (invite) => {
  const result = await axios({
    url: API_URL,
    method: 'post',
    headers: {
      'x-api-key': API_KEY,
    },
    data: {
      query: print(createInviteStatement),
      variables: {
        input: {
          code: invite.code,
          status: invite.status
        }
      }
    }
  });
  return result.data.data.createInvite;
}

const generateInvite = () => ({code: genCode(), status: DEFAULT_STATUS});

module.exports = {
  generateAndPersistInvite: async (event) => persistInvite(generateInvite()),
  genCode: genCode
}
