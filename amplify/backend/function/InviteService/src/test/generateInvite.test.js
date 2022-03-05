const assert = require('assert');
const fc = require('fast-check');

const { genCode } = require('../generateInvite.js');

describe('genCode', () => {
  it('should always generate a 6 character code', () => {
    fc.assert(fc.property(fc.integer(), num => genCode().length === 6));
  });
});
