export const isObject = obj => obj !== null && obj && typeof obj === 'object' && !Array.isArray(obj);

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

export const isBuiltInComponent = vnode => {
  if (!vnode) {
    return false;
  }

  const { tag } = vnode.componentOptions;

  return /^(keep-alive|transition|transition-group)$/.test(tag);
};

export default {};
