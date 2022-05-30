const assert = require('assert');
const fc = require('fast-check');
const sinon = require("sinon");
const api = require("../wrappers/phoneChallengeGraphqlWrapper.js"); 
const sns = require("../wrappers/snsWrapper.js");

const { cleanPhoneNumber, initiatePhoneChallenge } = require('../phone/initiatePhoneChallenge.js');

describe('cleanPhoneNumber', () => {
  it('should throw when passed an obviously invalid phone number', () => assert.throws(
    () => cleanPhoneNumber("123THX1472"), 
    Error, 
    "Cannot initiate challenge for phone number 123THX1472. Phone number is not a valid US phone number.")
  )

  it('should return the same phone number when given the same number but differently formatted', () => {
    const phoneNumbers = [cleanPhoneNumber("416-555-2368"), cleanPhoneNumber("1-416-555-2368"), cleanPhoneNumber("4165552368")];
    assert(
      phoneNumbers.every(n => n === phoneNumbers[0] )
    );
  });
});

describe('initiatePhoneChallenge', () => {
  let numberHasChallengeStub;
  let persistChallengeStub;
  let sendSMSCHallengeStub;

  const phoneNumber = "4165557890";
  const event = {
    arguments: {
      phoneNumber: phoneNumber
    }
  }

  beforeEach(() => {
    numberHasChallengeStub = sinon.stub(api, "phoneNumberHasChallenge");
    persistChallengeStub = sinon.stub(api, "persistChallenge");
    sendSMSChallengeStub = sinon.stub(sns, "sendSMSChallenge");
  });

  afterEach(() => {
    numberHasChallengeStub.restore();
    persistChallengeStub.restore();
    sendSMSChallengeStub.restore();
  });

  xit("should not send an SMS if challenge already exists", async () => {
    numberHasChallengeStub.returns(Promise.resolve(true));
    
    try {
      await initiatePhoneChallenge(event);
    } catch {} finally {
      assert.equal(sendSMSChallengeStub.callCount, 0);
    }
  });

  it("should not persist new challenge if challenge already exists", async () => {
    numberHasChallengeStub.returns(Promise.resolve(true));
    
    try {
      await initiatePhoneChallenge(event);
    } catch {} finally {
      assert.equal(persistChallengeStub.callCount, 0);
    }
  });

  it("should send one SMS to phone if challenge does not already exist", async () => {
    numberHasChallengeStub.returns(Promise.resolve(false));
    sendSMSChallengeStub.returns(Promise.resolve());
    
    await initiatePhoneChallenge(event);
    assert.equal(sendSMSChallengeStub.callCount, 1);
  });

  it("should not persist phoneChallenge if SMS was not successful", async () => {
    numberHasChallengeStub.returns(Promise.resolve(false));
    sendSMSChallengeStub.returns(Promise.reject());
    
    try {
      await initiatePhoneChallenge(event);
    } catch {} finally {
      assert.equal(persistChallengeStub.callCount, 0);
    }
  });

  it("should persist phoneChallenge if challenge does not already exist and SMS was successful", async () => {
    numberHasChallengeStub.returns(Promise.resolve(false));
    sendSMSChallengeStub.returns(Promise.resolve());
    
    await initiatePhoneChallenge(event);
    assert.equal(persistChallengeStub.callCount, 1);
  });
});
