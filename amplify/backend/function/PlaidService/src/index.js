/* Amplify Params - DO NOT EDIT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIENDPOINTOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIIDOUTPUT
	API_THEPLAYERSCOMPANY_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { createToken } = require("./workflows/createToken.js");
const { updateToken } = require("./workflows/updateToken.js");

const resolvers = Object.freeze({
    createPlaidLink: (event) => createToken(event.arguments.athleteId),
    updatePlaidLink: (event) => updateToken(event)
});

const fallback = (event) => Promise.reject(`No handler defined for fieldName: ${event.fieldName}`);

exports.handler = async (event) => (resolvers[event.fieldName] || fallback)(event);


