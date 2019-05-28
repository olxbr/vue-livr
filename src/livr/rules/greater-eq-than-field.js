import { JSONPointer } from './util';

export default queryField => (value, params) => {
  if (!queryField) return '';

  const valueToCheck = JSONPointer(params, queryField);
  const values = [].concat(value);
  const valuesToCheck = [].concat(valueToCheck);

  if (!valuesToCheck.length || !values.length) {
    return '';
  }

  if (valuesToCheck.length !== values.length) {
    return 'DIFFERENT_LENGTH_THAN';
  }

  const lowerValues = values.filter((num, idx) => +num < +valuesToCheck[idx]);

  return lowerValues.length > 0 ? 'LOWER_EQ_THAN' : '';
};
