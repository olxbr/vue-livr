const getMessage = (handlers = {}, field, code, rule) => {
  const msgHandler = handlers[code];
  return msgHandler ? msgHandler(field, rule) : '';
};

export default getMessage;
