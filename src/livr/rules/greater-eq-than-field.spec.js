import greaterEqThan from './greater-eq-than-field';

describe('greaterEqThan', () => {
  const queryField = 'field_2';
  const queryParams = { field_2: 5 };
  const multipleQueryParams = { field_2: [5, 10] };
  const greaterValue = 10;
  const equalValue = 5;
  const lowerValue = 1;

  it("should return an empty string when params doesn't match the query", () => {
    const emptyParams = {};
    const output = greaterEqThan(queryField)(greaterValue, emptyParams);
    expect(output).toBe('');
  });

  it('should return an empty string when value is greater than comparative field', () => {
    const output = greaterEqThan(queryField)(greaterValue, queryParams);
    expect(output).toBe('');
  });

  it('should return an empty string when value is equal to the comparative field', () => {
    const output = greaterEqThan(queryField)(equalValue, queryParams);
    expect(output).toBe('');
  });

  it('should return "LOWER_EQ_THAN" string when value is lower than the comparative field', () => {
    const output = greaterEqThan(queryField)(lowerValue, queryParams);
    expect(output).toBe('LOWER_EQ_THAN');
  });

  it('should return "LOWER_EQ_THAN" string when any value is lower than the comparative field', () => {
    const output = greaterEqThan(queryField)([lowerValue, equalValue], multipleQueryParams);
    expect(output).toBe('LOWER_EQ_THAN');
  });

  it('should return "DIFFERENT_LENGTH_THAN" string when values length are not equal to the comparative field', () => {
    const output = greaterEqThan(queryField)([lowerValue, equalValue], queryParams);
    expect(output).toBe('DIFFERENT_LENGTH_THAN');
  });

  it('should return "DIFFERENT_LENGTH_THAN" string when comparative field length are not equal to the values', () => {
    const output = greaterEqThan(queryField)(equalValue, multipleQueryParams);
    expect(output).toBe('DIFFERENT_LENGTH_THAN');
  });
});
