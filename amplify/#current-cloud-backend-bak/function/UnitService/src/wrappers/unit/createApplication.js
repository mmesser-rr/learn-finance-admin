const { Unit } = require("@unit-finance/unit-node-sdk");

const IP = "127.0.0.1";
const COUNTRY_CODE = "US";
const APPLICATION_TYPE = "individualApplication";

const parseAddress = (unit) => ({
  streetAddress,
  apt,
  city,
  state,
  zipCode
}) => unit.helpers.createAddress(streetAddress, apt, city, state, zipCode, "US");

const parseApplicationParams = (unit) => (
  ssn,
  {
    firstName,
    lastName,
    dateOfBirth,
    address,
    email,
    mobilePhone,
    id
  }
) => ({
  type: APPLICATION_TYPE,
  attributes: {
    ssn: ssn,
    fullName: unit.helpers.createFullName(firstName, lastName),
    dateOfBirth: dateOfBirth,
    address: parseAddress(unit)(address),
    email: email,
    phone: unit.helpers.createPhone("1", mobilePhone.substring(2)),
    tags:{
      athleteId: id
    }
  }
});

const createApplication = (unit) => (ssn, athlete) => {
  const unitParams = parseApplicationParams(unit)(ssn, athlete);
  return unit.applications.create(unitParams)
    .then(rejectIfNotApproved)
    .then(resultLens)
    .catch(err => Promise.reject(`Failed to submit application to Unit API. Error: ${JSON.stringify(err.errors)}`));
}

const rejectIfNotApproved = (res) => 
  (res.data.attributes.status === "Approved") ? 
  Promise.resolve(res.data) :
  Promise.reject({
    appId: res.data.id,
    status: res.data.attributes.status,
    message: res.data.attributes.message
  })

const resultLens = (res) => ({
  appId: res.id,
  custId: res.relationships.customer.data.id
});

module.exports = {
  rejectIfNotApproved,
  resultLens,
  createApplication
}
