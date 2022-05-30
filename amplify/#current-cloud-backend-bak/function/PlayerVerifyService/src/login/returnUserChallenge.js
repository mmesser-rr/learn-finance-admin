const parsePhoneNumber = require('libphonenumber-js');

const api = require("../wrappers/phoneChallengeGraphqlWrapper.js");
const PhoneChallenge = require("../models/PhoneChallenge.js");
const sns = require("../wrappers/snsWrapper.js");

const genCode = require("../genCode.js");

const errorPreamble = (phoneNumber, postamble) => `Cannot initiate challenge for phone number ${phoneNumber}. ${postamble}`;

const cleanPhoneNumber = (phoneNumber) => {
  const cleanNumber = parsePhoneNumber(phoneNumber, 'US');

  if (cleanNumber == undefined || !cleanNumber.isValid()) {
    throw new Error(errorPreamble(phoneNumber, "Phone number is not a valid US phone number."));
  } 

  return cleanNumber.number;
}

returnUserChallenge = async (event) => {
  const code = genCode();
  const phoneNumber = cleanPhoneNumber(event.arguments.phoneNumber);
  const challenge = PhoneChallenge(code, phoneNumber);

  return sns.sendSMSChallenge(challenge)
    .catch(err => {
      throw new Error(errorPreamble(phoneNumber, `Error while attempting to send SMS: ${err}`));
    })
    .then(d => api.persistChallenge(challenge))
    .catch(err => {
      throw new Error(errorPreamble(phoneNumber, `Error while attempting to persist Challenge: ${err}`));
    });
}

module.exports = {
  returnUserChallenge: returnUserChallenge,
  cleanPhoneNumber: cleanPhoneNumber
}
