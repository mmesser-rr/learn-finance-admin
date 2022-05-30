const assert = require('assert');
const sinon = require("sinon");
const { clone } = require("ramda");

const { createAndPersistAccount } = require("../workflows/createAccount");
const tpc = require("../wrappers/tpc");
const unit = require("../wrappers/unit");

describe('createAccount', () => {
  const athlete = {
    "id": "20025",
    "firstName": "Richard",
    "lastName": "Hendricks",
    "dateOfBirth": "2001-08-10",
    "address": {
      "streetAddress": "20 Ingram St.",
      "apt": "3",
      "city": "Forest Hills",
      "state": "CA",
      "zipCode": "11375"
    },
    "unitLookup": {
      "appId": "228152",
      "custId": "191485"
    },
    "email": "april@baxter.com",
    "phone": "2025550158"
  }

  const unitResponse = {
    data: {
      attributes: {
        accountNumber: "1000271603",
        routingNumber: "20025"
      }
    }
  };

  const arbitrary = {};

  let persistAccountStub;

  beforeEach(() => {
    getAthleteStub = sinon.stub(tpc, "getAthlete");
    persistAccountStub = sinon.stub(tpc, "persistAccount");
    createAccountStub = sinon.stub(unit, "createAccount");
  });

  afterEach(() => {
    getAthleteStub.restore();
    persistAccountStub.restore();
    createAccountStub.restore();
  });

  describe("before doing any work", () => {
    it("should throw if athlete has not made a unit application", () => {
      const athleteWithoutCustId = clone(athlete);
      athleteWithoutCustId.unitLookup.custId = undefined;

      getAthleteStub.resolves(athleteWithoutCustId);

      assert.rejects(createAndPersistAccount(athlete.id), "Athlete does not have a unit customer id. Has their unit application been approved?");
    });
  });

  describe("when creating the athlete account in the Unit API", async () => {
    it("should create an account once in unit with athlete", async () => {
      getAthleteStub.resolves(athlete);
      createAccountStub.resolves(unitResponse);
      persistAccountStub.resolves(arbitrary);

      await createAndPersistAccount(athlete);

      sinon.assert.calledOnce(createAccountStub);
    });

    it("should reject if account not successfully created in Unit API", async () => {
      getAthleteStub.resolves(athlete);
      createAccountStub.rejects("error");

      assert.rejects(createAndPersistAccount(athlete));
    });
  });

  describe("when persisting the athlete account in TPC", async () => {
    it("should not persist athlete account if Unit API fails", async () => {
      getAthleteStub.resolves(athlete);
      createAccountStub.rejects(arbitrary);
      persistAccountStub.resolves(arbitrary);

      try {
        await createAccount(athlete.id);
      } catch {} finally {
        sinon.assert.notCalled(persistAccountStub);
      }
    });

    it("should persist unit deposit account details in TPC", async () => {
      getAthleteStub.resolves(athlete);
      createAccountStub.resolves(unitResponse);
      persistAccountStub.resolves(arbitrary);

      await createAndPersistAccount(athlete.id);

      const athleteId = athlete.id

      const athleteAccount = {
        athleteId,
        accountNumber: unitResponse.data.attributes.accountNumber,
        routingCode: unitResponse.data.attributes.routingNumber
      }

      sinon.assert.calledWith(persistAccountStub, athleteAccount);
    });

    it("should persist athlete account in TPC once", async () => {
      getAthleteStub.resolves(athlete);
      createAccountStub.resolves(unitResponse);
      persistAccountStub.resolves(arbitrary);

      await createAndPersistAccount(athlete.id);

      sinon.assert.calledOnce(persistAccountStub);
    });
  });
});
