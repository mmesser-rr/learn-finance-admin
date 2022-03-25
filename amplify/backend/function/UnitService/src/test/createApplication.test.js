const assert = require('assert');

const { rejectIfNotApproved } = require("../wrappers/unit/createApplication");

describe('rejectIfNotApproved', () => {
  const fixture = {
    approvedResponse: {
      data: {
        attributes: {
          status: "Approved"
        }
      }
    },
    pendingResponse: {
      data: {
        attributes: {
          status: "Pending"
        }
      }
    }
  }

  it("should return a rejected promise if passed a application result with no approved status", async () => {
    await assert.rejects(rejectIfNotApproved(fixture.pendingResponse));
  });

  it("should return a resolved promise if passed a application result with approved status", async () => {
    await rejectIfNotApproved(fixture.approvedResponse); // Will throw if rejected
  });
});
