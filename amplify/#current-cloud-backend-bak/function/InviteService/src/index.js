/* Amplify Params - DO NOT EDIT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIIDOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT
	API_THEPLAYERSCOMPANY_INVITETABLE_ARN
	API_THEPLAYERSCOMPANY_INVITETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { generateAndPersistInvite } = require('./generateInvite.js');

const resolvers = {
  generateInvite: generateAndPersistInvite
};

const fallback = (event) => {throw new Error `No handler defined for fieldName: ${event.fieldName}`};

exports.handler = async (event) => await (resolvers[event.fieldName] || fallback)(event);
