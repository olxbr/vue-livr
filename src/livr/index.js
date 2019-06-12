import LIVR from 'livr';
import { patchRule } from '../utils';
import LivrError from './error';

const patchRules = () => {
  const rulesToPatch = LIVR.Validator.getDefaultRules();
  const newRules = Object.entries(rulesToPatch).reduce(
    (agg, [ruleName, ruleBuilder]) =>
      Object.assign(agg, {
        [ruleName]: patchRule(ruleName, ruleBuilder),
      }),
    {},
  );

  LIVR.Validator.registerDefaultRules(newRules);
};

export default class Livr {
  constructor(pluginContainer, options) {
    this.extendedErrors = options.extendedErrors;
    this.aliasedRules = options.aliasedRules;

    this.aliasedRules.forEach(this.registerAliasedDefaultRule);
    LIVR.Validator.registerDefaultRules(options.extraRules);

    this.errors = new LivrError(null, options);

    if (this.extendedErrors) {
      patchRules();
    }

    this.fields = { items: [] };

    this.$gzLivr = pluginContainer || {
      _vm: {
        $emit: () => {},
        $off: () => {},
      },
    };
  }

  validate(validations, fields, field) {
    this.validator = new LIVR.Validator(validations);
    const valid = this.validator.validate(fields);
    const result = valid || this.validator.getErrors();

    if (!valid) {
      this.errors.setError(result, field);
      this.errors.setTouched(field);
      return { errors: this.errors.items };
    }

    this.errors.clearError(field);
    return result;
  }

  registerAliasedDefaultRule(aliasedRule) {
    LIVR.Validator.registerAliasedDefaultRule(aliasedRule);
  }

  validateAll(validations, fields) {
    this.validator = new LIVR.Validator(validations);
    const valid = this.validator.validate(fields);
    const result = valid || this.validator.getErrors();
    if (!valid) {
      this.errors.setError(result);
      this.errors.setAllTouched(true);
      return { errors: this.errors.items };
    }

    this.errors.clearErrors();
    return result;
  }

  clearErrors() {
    this.errors.clearErrors();
  }

  clearError(field) {
    this.errors.clearError(field);
  }
}
