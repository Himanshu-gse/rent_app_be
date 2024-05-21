class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "An internal server error occurred";

  // Handle specific Mongoose CastError
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle duplicate key error (MongoDB error code 11000)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 409); // Conflict status code
  }

  // Handle invalid JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. Try again.`;
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. Try again.`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: err.message });
  }

  // Default to 500 server error
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
