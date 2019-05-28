import rule from './list-of-different-nested-objects';

describe('listOfDifferentNestedObjects', () => {
  const selectorField = 'rentalInfo/period';
  const livrs = {
    DAILY: { price: { number_between: [3, 30000] } },
  };
  const rules = {};

  const getObjects = (period = 'DAILY', price = 1) => [
    {
      price,
      rentalInfo: {
        period,
      },
    },
  ];

  const params = [];

  it("should return an empty string when selectorField doesn't match object", () => {
    const outputArr = [];
    const objects = getObjects();
    const output = rule('rentalInfo/notExistentField', livrs, rules)(objects, params, outputArr);
    expect(output).toBe('');
  });

  it("should return an empty string when value doesn't exists in rule conditions", () => {
    const outputArr = [];
    const objects = getObjects('NOT_EXISTENT_PERIOD');
    const output = rule(selectorField, livrs, rules)(objects, params, outputArr);
    expect(output).toBe('');
  });

  it('should return an empty string when value pass rule conditions', () => {
    const outputArr = [];
    const objects = getObjects('DAILY', 10);
    const output = rule(selectorField, livrs, rules)(objects, params, outputArr);
    expect(output).toBe('');
  });

  it("should return 'FORMAT_ERROR' string when value is not a list", () => {
    const outputArr = [];
    const objects = {};
    const output = rule(selectorField, livrs, rules)(objects, params, outputArr);
    expect(output).toBe('FORMAT_ERROR');
  });

  it('should return outputArr with rule conditions errors', () => {
    const outputArr = [];
    const objects = getObjects();
    const output = rule(selectorField, livrs, rules)(objects, params, outputArr);

    expect(output).not.toBe('');
    expect(output[0]).toMatchObject({ price: 'TOO_LOW' });
  });
});
