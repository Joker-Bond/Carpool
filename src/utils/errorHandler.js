const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const response = {
    status: statusCode,
    message: err.message || 'Internal Server Error'
  };
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
};

module.exports = errorHandler;