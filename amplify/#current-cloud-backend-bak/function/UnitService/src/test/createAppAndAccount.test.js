const assert = require('assert');
const sinon = require("sinon");
const { clone } = require("ramda");

const { createAppAndAccount } = require("../workflows/createAppAndAccount");
const tpc = require("../wrappers/tpc");
const unit = require("../wrappers/unit");

describe('createAppAndAccount', () => {
  const ssn = "000000005";

  const athleteId = "20025";

  const athlete = {
    "id": athleteId,
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

  const athleteWithoutCustId = clone(athlete);
  athleteWithoutCustId.unitLookup = undefined;

  const unitCustAndAppId = {
    custId: '199630',
    appId: '2005'
  }

  const unitApplicationApprovedResponse = {
    appId: "2005",
    custId: "199630"
  }

  const unitApplicationPendingResponse = {
    appId: "882",
    status: "Pending"
  }

  const unitAccountResponse = {
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
    createApplicationStub = sinon.stub(unit, "createApplication");
    updateUnitDataStub = sinon.stub(tpc, "addUnitDataToAthlete");
    persistAccountStub = sinon.stub(tpc, "persistAccount");
    createAccountStub = sinon.stub(unit, "createAccount");
  });

  afterEach(() => {
    getAthleteStub.restore();
    persistAccountStub.restore();
    createApplicationStub.restore();
    updateUnitDataStub.restore();
    createAccountStub.restore();
  });

  describe("before doing any work", () => {
    it("should reject if athlete has made a unit application already", async () => {
      const athleteWithCustId = clone(athlete);
      // The athlete only has a custId if a customer was created in Unit after a successful application
      athleteWithCustId.unitResponse = { custId: "5005" }; 

      getAthleteStub.resolves(athleteWithCustId);

      await assert.rejects(
        createAppAndAccount(athleteId),
        (err) => {
          assert.strictEqual(
            err.message, 
            "Looks like this athlete is already affiliated with a Unit customer. Continuing will overwrite and lose current unit data. Bailing"
          )

          return true;
        }
      );
    });
  });

  describe("when creating an application in Unit API", async () => {
    it("should create an application in Unit API if no appId found", async () => {
      getAthleteStub.resolves(athlete);
      getAthleteStub.onFirstCall().resolves(athleteWithoutCustId);
      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);
      persistAccountStub.resolves(arbitrary);

      await createAppAndAccount(ssn, athleteId);

      sinon.assert.calledOnce(createApplicationStub);
    });

    it("should not create an application in Unit API if athlete already has an Unit customer affiliated with it", async () => {
      getAthleteStub.resolves(athlete);

      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);
      persistAccountStub.resolves(arbitrary);

      try {
        await createAppAndAccount(ssn, athleteWithCustId);
      } catch {} // Will throw but this is expected

      sinon.assert.notCalled(createApplicationStub);
    });
  });

  describe("when persisting a Unit application and customer id in TPC backend", async () => {
    it("should persist application id and customer id from Unit in TPC backend when Unit application is approved", async () => {

      getAthleteStub.resolves(athlete);
      getAthleteStub.onFirstCall().resolves(athleteWithoutCustId);
      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);

      await createAppAndAccount(ssn, athleteId);
      
      sinon.assert.calledWith(updateUnitDataStub, athleteId, unitCustAndAppId);
    });

    it("should persist just application id from Unit in TPC backend when the Unit application is not approved (there is no customer id to persist)", async () => {
      getAthleteStub.resolves(athlete);
      getAthleteStub.onFirstCall().resolves(athleteWithoutCustId);
      createApplicationStub.rejects(unitApplicationPendingResponse);
      updateUnitDataStub.resolves(arbitrary);

      try {
        await createAppAndAccount(ssn, athleteWithoutCustId);
      } catch {} // Exception expected but not relevant
      
      sinon.assert.calledWith(updateUnitDataStub, athleteId, unitApplicationPendingResponse);
    });
  });

  describe("when creating athlete accounts in the Unit API", async () => {
    it("should open 3 accounts in Unit if application is approved", async () => {
      getAthleteStub.resolves(athlete);
      getAthleteStub.onFirstCall().resolves(athleteWithoutCustId);

      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);
      persistAccountStub.resolves(arbitrary);

      await createAppAndAccount(ssn, athleteWithoutCustId);

      sinon.assert.calledThrice(createAccountStub);
    })

    it("should not open an account in Unit if application is not approved", async () => {
      getAthleteStub.resolves(athleteWithoutCustId);
      createApplicationStub.resolves(unitApplicationPendingResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);

      try { 
        await createAppAndAccount(ssn, athleteWithoutCustId);
      } catch {} // Exception expected but not relevant

      sinon.assert.notCalled(createAccountStub);
    })

    it("should reject if account not successfully created in Unit API", async () => {
      getAthleteStub.resolves(athleteWithoutCustId);
      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.rejects("error");

      await assert.rejects(createAppAndAccount(ssn, athleteWithoutCustId));
    });
  });

  describe("when persisting the athlete account in TPC", async () => {
    it("should not persist athlete account if attempt to create account in Unit fails", async () => {
      getAthleteStub.resolves(athleteWithoutCustId);
      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.rejects(arbitrary);
      persistAccountStub.resolves(arbitrary);

      try {
        await createAppAndAccount(athlete);
      } catch {} finally {
        sinon.assert.notCalled(persistAccountStub);
      }
    });

    it("should persist unit deposit account details in TPC", async () => {
      getAthleteStub.resolves(athlete);
      getAthleteStub.onFirstCall().resolves(athleteWithoutCustId);

      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);
      persistAccountStub.resolves(arbitrary);

      await createAppAndAccount(ssn, athleteWithoutCustId);

      const athleteId = athlete.id

      const athleteAccount = {
        athleteId,
        accountNumber: unitAccountResponse.data.attributes.accountNumber,
        routingCode: unitAccountResponse.data.attributes.routingNumber
      }

      sinon.assert.calledWith(persistAccountStub, athleteAccount);
    });

    it("should persist all three athlete accounts in TPC", async () => {
      getAthleteStub.resolves(athlete);
      getAthleteStub.onFirstCall().resolves(athleteWithoutCustId);

      createApplicationStub.resolves(unitApplicationApprovedResponse);
      updateUnitDataStub.resolves(arbitrary);
      createAccountStub.resolves(unitAccountResponse);
      persistAccountStub.resolves(arbitrary);

      await createAppAndAccount(ssn, athleteWithoutCustId);

      const athleteId = athlete.id

      sinon.assert.calledThrice(persistAccountStub);
    });
  });
});
