import get from 'lodash/get';

const DEFAULT_CONFIG = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  inject: true,
  aliasedRules: {},
  patchRules: false,
  extraRules: {},
};

// eslint-disable-next-line import/no-mutable-exports
export let currentConfig = Object.assign({}, DEFAULT_CONFIG);

export const resolveConfig = ctx => {
  const selfConfig = get(ctx, '$options.$_livr', {});

  return Object.assign({}, currentConfig, selfConfig);
};

export const getConfig = () => currentConfig;

export const setConfig = newConf => {
  currentConfig = Object.assign({}, currentConfig, newConf);
};
