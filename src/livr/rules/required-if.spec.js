import requiredIf from './required-if';

describe('RequiredIf', () => {
  const value = '';

  it('should throw error if there is no query', () => {
    expect(() => requiredIf({})).toThrow();
  });

  it("should return empty string when params doesn't match the query", () => {
    const query = { test: 'test' };
    const params = { test: '' };

    const output = requiredIf(query)(value, params);
    expect(output).toBe('');
  });

  it('should return empty string when value exists', () => {
    const query = { test: 'test' };
    const params = { test: 'test' };
    const validValue = 'foo';

    const output = requiredIf(query)(validValue, params);
    expect(output).toBe('');
  });

  it("should return empty string when params don't match the query and using a non-primitive value for query", () => {
    const query = { test: { one_of: ['a', 'b'] } };
    const params = { test: 'test' };

    const output = requiredIf(query)(value, params);
    expect(output).toBe('');
  });

  it('should return "REQUIRED" when params match the query', () => {
    const query = { test: 'test' };
    const params = { test: 'test' };

    const output = requiredIf(query)(value, params);
    expect(output).toBe('REQUIRED');
  });

  it('should return "REQUIRED" when params match the query and using a non-primitive value for query', () => {
    const query = { test: { one_of: ['test', 'b'] } };
    const params = { test: 'test' };

    const output = requiredIf(query)(value, params);
    expect(output).toBe('REQUIRED');
  });
});
