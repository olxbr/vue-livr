let VALIDATOR = null;

export const getValidator = () => VALIDATOR;

export const setValidator = value => {
  VALIDATOR = value;

  return value;
};
