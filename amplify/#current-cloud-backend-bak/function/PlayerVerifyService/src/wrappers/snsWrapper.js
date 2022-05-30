const aws = require('aws-sdk');
const sns = new aws.SNS();

const sendSMSChallenge = (challenge) => {
  const params = {
    Message: challenge.code,
    PhoneNumber: challenge.phoneNumber
  };

  return sns.publish(params).promise();
};

module.exports = {
  sendSMSChallenge
}
