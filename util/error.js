exports.handle404Error = (model) => {
  const error = new Error();
  error.message = `${model} not found`;
  error.status = 404;
  return error;
};

exports.handle500Error = () => {
  const error = new Error();
  error.message = "Internal server error";
  error.status = 500;
  return error;
};

exports.handle400Error = (message) => {
  const error = new Error();
  error.message = message;
  error.status = 400;
  return error;
};
