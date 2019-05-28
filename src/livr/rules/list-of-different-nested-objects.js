import LIVR from 'livr';
import { JSONPointer, isNoValue } from './util';

export default (selectorField, livrs, ruleBuilders) => {
  const validators = Object.entries(livrs).reduce(
    (agg, [condition, rule]) =>
      Object.assign(agg, {
        [condition]: new LIVR.Validator(rule).registerRules(ruleBuilders).prepare(),
      }),
    {},
  );

  return (objects, params, outputArr) => {
    if (isNoValue(objects)) return '';
    if (!Array.isArray(objects)) return 'FORMAT_ERROR';

    const results = [];
    const errors = [];
    let hasErrors = false;

    objects.forEach(object => {
      const pointer = JSONPointer(object, selectorField);
      const validator = validators[pointer];

      if (typeof object !== 'object' || !pointer || !validator) {
        errors.push('FORMAT_ERROR');
      } else {
        const result = validator.validate(object);

        if (result) {
          results.push(result);
          errors.push(null);
        } else {
          hasErrors = true;
          errors.push(validator.getErrors());
          results.push(null);
        }
      }
    });

    if (hasErrors) {
      return errors;
    }

    outputArr.push(results);
    return '';
  };
};
