const {bad_request} = require('./errors_constants')

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = bad_request;
  }
}

module.exports = BadRequestError;