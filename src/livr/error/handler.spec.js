import errorHandler from './handler';

describe('errorHandler', () => {
  const handlers = {
    REQUIRED(field, rule) {
      return `${field} ${rule}`;
    },
  };
  const valid = {
    field: 'bathrooms',
    code: 'REQUIRED',
    rule: 'required',
  };
  const invalid = {
    field: 'no_ecziste',
    code: 'BLASPHEMY',
    rule: 'one_to_rule_them_all',
  };

  it('should return empty msg', () => {
    const { field, code, rule } = invalid;
    const value = errorHandler(handlers, field, code, rule);
    expect(value).toBe('');
  });

  it('should return error msg', () => {
    const { field, code, rule } = valid;
    const value = errorHandler(handlers, field, code, rule);
    expect(value).not.toBe('');
  });
});
