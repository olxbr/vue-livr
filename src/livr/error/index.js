import set from 'lodash/set';
import get from 'lodash/get';
import getMessage from './handler';

const getErrorMessages = (errors, handlers, objectPath = []) => {
  const isArray = Array.isArray(errors);

  return Object.entries(errors).reduce((agg, [field, error]) => {
    let path = [].concat(objectPath);
    if (!isArray) { path.push(field) };
    
    if (error && error.code) {
      const [[, ruleValue]] = Object.entries(error.rule);
      Object.assign(error, {
        msg: getMessage(handlers, path.join('.'), error.code, ruleValue),
      });
      path = [];
    } else if (error) {
      getErrorMessages(error, handlers, path);
    }

    return Object.assign(agg, {
      [field]: error,
    });
  }, {});
}

export default class LivrError {
  constructor(livrError, options = {}) {
    this.errorHandlers = options.errorHandlers;
    this.extendedErrors = options.extendedErrors;

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
    const errors = this.extendedErrors ? getErrorMessages(result, this.errorHandlers) : result;
    const currentErrors = field ? this.items : {};
    this.items = Object.assign({}, currentErrors, errors);

    if (field) {
      const hasError = get(errors, field, false);
      if (!hasError) {
        set(this.items, field, '');
      }
    }
  }

  clearErrors(items = this.items) {
    Object.entries(items).forEach(([key, value]) =>
      typeof value === 'object' ? this.clearErrors(value) : this.clearError(key),
    );
  }

  clearError(field) {
    this.setError({}, field);
  }

  getError(field) {
    if (!this.hasError(field)) {
      return '';
    }

    const msgPath = this.extendedErrors ? '.msg' : '';
    return get(this.items, `${field}${msgPath}`, '');
  }

  hasError(field) {
    const isTouched = this.allTouched || get(this.touchedFields, field, false);
    const msgPath = this.extendedErrors ? '.msg' : '';
    const hasMsg = get(this.items, `${field}${msgPath}`, '');
    return isTouched && hasMsg !== '';
  }
}
