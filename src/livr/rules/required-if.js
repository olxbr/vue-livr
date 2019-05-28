import LIVR from 'livr';
import { isAcceptedValue, isNoValue, isPrimitiveValue, JSONPointer } from './util';

export default query => {
  const [queryKey] = Object.keys(query);
  const queryValue = query[queryKey];

  if (!queryValue || !isAcceptedValue(queryValue)) {
    throw new Error('LIVR: the target value of the "required_if" rule is missed or incomparable');
  }

  return (value, params) => {
    if (!isNoValue(value) || !queryKey) return '';
    const valueToCheck = JSONPointer(params, queryKey);
    let isRequired = false;

    if (isPrimitiveValue(queryValue)) {
      isRequired = valueToCheck === queryValue && isNoValue(value);

      return isRequired ? 'REQUIRED' : '';
    }

    const target = { [queryKey]: valueToCheck };
    const validator = new LIVR.Validator(query);
    isRequired = validator.validate(target);

    return isRequired ? 'REQUIRED' : '';
  };
};
