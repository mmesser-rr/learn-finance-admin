const assert = require('assert');
const fc = require('fast-check');
const sinon = require("sinon");

const api = require("../wrappers/phoneChallengeGraphqlWrapper.js"); 

const tryPhoneChallenge = require("../phone/tryPhoneChallenge.js");

describe('tryPhoneChallenge', () => {
  let phoneNumberHasChallengeStub;
  let persistChallengeStub;
  let sendPhoneChallengeStub;

  const phoneNumber = "123-555-4456";
  const event = {
    arguments: {
      phoneNumber: phoneNumber,
      code: "TESTCO"
    }
  }

  beforeEach(() => {
    getPhoneChallengeStub = sinon.stub(api, "getPhoneChallenge");
    verifyPhoneChallengeStub = sinon.stub(api, "verifyPhoneChallenge");
  });

  afterEach(() => {
    getPhoneChallengeStub.restore();
    verifyPhoneChallengeStub.restore();
  });

  it("should return true if challenge exists for phone with correct code", async () => {
    getPhoneChallengeStub.returns(Promise.resolve(event.arguments));
    verifyPhoneChallengeStub.returns(Promise.resolve());
    
    const result = await tryPhoneChallenge(event);
    assert.equal(result, true);
  });

  it("should return false if no challenge with phone & code found", async () => {
    getPhoneChallengeStub.returns(Promise.resolve(undefined));
    
    const result = await tryPhoneChallenge(event);
    assert.equal(result, false);
  });

  it("should not set challenge as verified if no challenge with phone and code found", async () => {
    getPhoneChallengeStub.returns(Promise.resolve(undefined));
    verifyPhoneChallengeStub.returns(Promise.resolve());
    
    const result = await tryPhoneChallenge(event);
    assert.equal(verifyPhoneChallengeStub.callCount, 0);
  });

  it("should set challenge as verified if challenge exists for phone with correct code", async () => {
    getPhoneChallengeStub.returns(Promise.resolve(event.arguments));
    verifyPhoneChallengeStub.returns(Promise.resolve());
    
    const result = await tryPhoneChallenge(event);
    assert.equal(verifyPhoneChallengeStub.callCount, 1);
  });
});
