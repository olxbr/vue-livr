export const isObject = value => {
  if (typeof value === 'object') return true;
  return false;
};

export const isPrimitiveValue = value => {
  if (typeof value === 'string') return true;
  if (typeof value === 'number' && Number.isFinite(value)) return true;
  if (typeof value === 'boolean') return true;
  return false;
};

export const looksLikeNumber = value => {
  if (!Number.isNaN(+value)) return true;
  return false;
};

export const isAcceptedValue = value => {
  if (isPrimitiveValue(value) || isObject(value)) return true;
  return false;
};

export const isNoValue = value => value === undefined || value === null || value === '';

export const JSONPointer = (object, pointer) => {
  const parts = pointer.split('/');
  let value = object;

  for (let i = 0; i < parts.length && value; i += 1) {
    value = value[parts[i]];
  }

  return value;
};

export const parse = rules => Object.keys(rules).reduce((obj, rule) => Object.assign(obj, { ...rule }), {});

const parsers = {
  nested_object(rule) {
    return { ...rule };
  },
};

export const patchRule = (ruleName, ruleBuilder) => {
  const newRule = (...params) => {
    const ruleValidator = ruleBuilder(...params);
    const ruleArgs = params.splice(0, params.length - 1);
    const newBuilder = (...innerParams) => {
      const errorCode = ruleValidator(...innerParams);

      if (errorCode) {
        const rule = {
          [ruleName]: ruleArgs,
        };

        if (Array.isArray(errorCode)) {
          return errorCode[0];
        }

        if (isObject(errorCode)) {
          return errorCode;
        }

        return {
          code: errorCode,
          rule,
        };
      }

      return '';
    };

    return newBuilder;
  };
  return newRule;
};

export default {
  isPrimitiveValue,
  looksLikeNumber,
  isObject,
  isAcceptedValue,
  isNoValue,
  JSONPointer,
  parse,
  parsers,
  patchRule,
};
