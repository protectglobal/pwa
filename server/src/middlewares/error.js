const errorHandling = (exc, req, res, next) => {
  // TODO: Log the exception
  res.status(500).send('Something failed');
  next();
};

module.exports = errorHandling;
