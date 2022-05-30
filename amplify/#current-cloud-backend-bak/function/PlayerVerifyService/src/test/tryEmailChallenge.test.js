const assert = require('assert');
const fc = require('fast-check');
const sinon = require("sinon");

const api = require("../wrappers/emailChallengeGraphqlWrapper.js"); 

const tryEmailChallenge = require("../email/tryEmailChallenge.js");

describe('tryEmailChallenge', () => {
  let emailHasChallengeStub;
  let persistChallengeStub;
  let sendEmailCHallengeStub;

  const email = "testemail@example.com";
  const event = {
    arguments: {
      email: email,
      code: "TESTCO"
    }
  }

  beforeEach(() => {
    getEmailChallengeStub = sinon.stub(api, "getEmailChallenge");
    verifyEmailChallengeStub = sinon.stub(api, "verifyEmailChallenge");
  });

  afterEach(() => {
    getEmailChallengeStub.restore();
    verifyEmailChallengeStub.restore();
  });

  it("should return true if challenge exists for email with correct code", async () => {
    getEmailChallengeStub.returns(Promise.resolve(event.arguments));
    verifyEmailChallengeStub.returns(Promise.resolve());
    
    const result = await tryEmailChallenge(event);
    assert.equal(result, true);
  });

  it("should set challenge as verified if challenge exists for email with correct code", async () => {
    getEmailChallengeStub.returns(Promise.resolve(event.arguments));
    verifyEmailChallengeStub.returns(Promise.resolve());
    
    const result = await tryEmailChallenge(event);
    assert.equal(verifyEmailChallengeStub.callCount, 1);
  });

  it("should return false if no challenge with email & code found", async () => {
    getEmailChallengeStub.returns(Promise.resolve(undefined));
    
    const result = await tryEmailChallenge(event);
    assert.equal(result, false);
  });

  it("should not set challenge as verified if no challenge with email and code found", async () => {
    getEmailChallengeStub.returns(Promise.resolve(undefined));
    verifyEmailChallengeStub.returns(Promise.resolve());
    
    const result = await tryEmailChallenge(event);
    assert.equal(verifyEmailChallengeStub.callCount, 0);
  });
});
