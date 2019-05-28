import LIVR from 'livr';
import { JSONPointer, isAcceptedValue, isPrimitiveValue, isNoValue } from './util';

export default (query, arg2, arg3, context, ruleBuilders) => {
  const [queryKey] = Object.keys(query);
  const queryValue = query[queryKey];

  if (!queryValue || !isAcceptedValue(queryValue)) {
    throw new Error('LIVR: the target value of the "not_empty_list_if" rule is missed or incomparable');
  }

  return (value, params) => {
    let isRequired;
    const valueToCheck = JSONPointer(params, queryKey);
    if (!isPrimitiveValue(queryValue)) {
      const target = { [queryKey]: valueToCheck };
      const validator = new LIVR.Validator(query).registerRules(ruleBuilders).prepare();
      isRequired = validator.validate(target);
    }
    if (!isRequired || !queryKey) return '';

    if (!isNoValue(value)) return 'CANNOT_BE_EMPTY';
    if (!Array.isArray(value)) return 'FORMAT_ERROR';
    if (value.length < 1) return 'CANNOT_BE_EMPTY';
    return '';
  };
};
