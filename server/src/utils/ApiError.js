class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

function ApiErrorHandler(res, code, message) {
  res.status(code).json({
    message: message,
  });
  throw new ApiError(code, message);
}
export { ApiError, ApiErrorHandler };
