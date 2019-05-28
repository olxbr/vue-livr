import set from 'lodash/set';
import get from 'lodash/get';
import getMessage from './handler';

const getErrorMessages = (errors, handlers, objectPath = []) =>
  Object.entries(errors).reduce((agg, [field, error]) => {
    let path = [].concat(objectPath);
    path.push(field);
    if (error.code) {
      const [[, ruleValue]] = Object.entries(error.rule);
      Object.assign(error, {
        msg: getMessage(handlers, path.join('.'), error.code, ruleValue),
      });
      path = [];
    } else {
      getErrorMessages(error, handlers, path);
    }

    return Object.assign(agg, {
      [field]: error,
    });
  }, {});

export default class LivrError {
  constructor(livrError, options) {
    this.handlers = options.handlers;
    this.patchRules = options.patchRules;

    this.allTouched = false;
    // make this bag a mirror of the provided one, sharing the same items reference.
    if (livrError && livrError instanceof LivrError) {
      this.items = livrError.items;
      this.touchedFields = livrError.touchedFields;
    } else {
      this.items = {};
      this.touchedFields = {};
    }
  }

  setTouched(field) {
    set(this.touchedFields, field, true);
  }

  setAllTouched(all = false) {
    this.allTouched = all;
  }

  setError(result, field) {
    const errors = getErrorMessages(result, this.handlers);
    const currentErrors = field ? this.items : {};
    this.items = Object.assign({}, currentErrors, errors);

    if (field) {
      const hasError = get(errors, field, false);
      if (!hasError) {
        set(this.items, field, '');
      }
    }
  }

  clearErrors() {
    Object.keys(this.items).forEach(item => this.clearError(item));
  }

  clearError(field) {
    this.setError({}, field);
  }

  getError(field) {
    if (!this.hasError(field)) {
      return '';
    }
    return get(this.items, `${field}.msg`, '');
  }

  hasError(field) {
    const isTouched = this.allTouched || get(this.touchedFields, field, false);
    const hasMsg = get(this.items, `${field}.msg`, '');
    return isTouched && hasMsg !== '';
  }
}
