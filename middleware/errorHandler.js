
const errorHandler = (err, req, res, next) => {

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Mongoose Invalid ID error — When an invalid ID format is provided
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Mongoose Validation error — When a required field is missing
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
  }

  // Mongoose Duplicate key error — When the same data is added again
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value: ${Object.keys(err.keyValue)} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Show stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;