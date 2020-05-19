import set from 'lodash/set';
import get from 'lodash/get';
import getMessage from './handler';
import { isValue } from '../../utils';

const getErrorMessages = (errors, handlers, objectPath = []) => {
  const isArray = Array.isArray(errors);

  return Object.entries(errors).reduce((agg, [field, error]) => {
    let path = [].concat(objectPath);
    if (!isArray) {
      path.push(field);
    }

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
};

export default class LivrError {
  constructor(livrError, options = {}) {
    this.errorHandlers = options.errorHandlers;
    this.extendedErrors = options.extendedErrors;
    this.msgPath = this.extendedErrors ? '.msg' : '';

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

  clearErrors(errors = this.items) {
    if (!errors) {
      return;
    }
    Object.entries(errors).forEach(([key, value]) => {
      return typeof value === 'object' ? this.clearErrors(value) : this.clearError(key);
    });
  }

  clearError(field) {
    this.setError({}, field);
  }

  getError(field, idx = 0) {
    if (!this.hasError(field, idx)) {
      return '';
    }

    const errors = this.getErrors(field);
    return this.getMessage(errors[idx]);
  }

  getMessage(error) {
    return this.msgPath ? error[this.msgPath] : error;
  }

  getFirstError(field) {
    const errors = this.getErrors(field);
    return errors.find(error => this.getMessage(error));
  }

  getErrors(field) {
    const errors = [].concat(get(this.items, field, []));
    return errors;
  }

  hasError(field, idx = 0) {
    const isTouched = this.allTouched || get(this.touchedFields, field, false);
    const errors = this.getErrors(field);
    return isTouched && isValue(this.getMessage(errors[idx]));
  }
}
