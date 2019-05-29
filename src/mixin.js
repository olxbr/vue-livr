/* eslint-disable no-underscore-dangle */

import { isBuiltInComponent, isObject } from './utils';
import Livr from './livr';
import { getValidator } from './state';
import { resolveConfig, setConfig } from './config';

/**
 * Checks if a parent livr instance was requested.
 */
const requestsValidator = injections => {
  if (isObject(injections) && injections.$livr) {
    return true;
  }

  return false;
};

export default {
  provide() {
    if (this.$livr && !isBuiltInComponent(this.$vnode)) {
      return {
        $livr: this.$livr,
      };
    }

    return {};
  },
  beforeCreate() {
    // if built in do nothing.
    if (isBuiltInComponent(this.$vnode) || this.$options.$__livrInject === false) {
      return;
    }

    // if its a root instance set the config if it exists.
    if (!this.$parent) {
      setConfig(this.$options.$_livr || {});
    }

    const options = resolveConfig(this);

    // if its a root instance, inject anyways, or if it requested a new instance.
    if (!this.$parent || (this.$options.$_livr && /new/.test(this.$options.$_livr.validator))) {
      this.$livr = new Livr(getValidator(), options);
    }

    const requested = requestsValidator(this.$options.inject);

    // if automatic injection is enabled and no instance was requested.
    if (!this.$livr && options.inject && !requested) {
      this.$livr = new Livr(getValidator(), options);
    }

    // don't inject errors or fieldBag as no livrInstance was resolved.
    if (!requested && !this.$livr) {
      return;
    }

    // There is a livrInstance but it isn't injected, mark as reactive.
    if (!requested && this.$livr) {
      const Vue = this.$options._base; // the vue constructor.
      Vue.util.defineReactive(this.$livr, 'errors', this.$livr.errors);
    }

    if (!this.$options.computed) {
      this.$options.computed = {};
    }

    this.$options.computed[options.errorBagName || 'errors'] = function errorBagGetter() {
      return this.$livr.errors;
    };
    this.$options.computed[options.fieldsBagName || 'fields'] = function fieldBagGetter() {
      return this.$livr.fields.items.reduce((acc, field) => {
        if (field.scope) {
          if (!acc[`$${field.scope}`]) {
            acc[`$${field.scope}`] = {};
          }

          acc[`$${field.scope}`][field.name] = field.flags;

          return acc;
        }

        acc[field.name] = field.flags;

        return acc;
      }, {});
    };
  },
};
