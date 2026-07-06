export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundHandler = (req, res) => {
  res.status(404).send({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error);
  res.status(statusCode).send({ message: error.message || "Internal server error" });
};
