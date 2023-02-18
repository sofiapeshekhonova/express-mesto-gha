const { BAD_REQUEST } = require('./errors_constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
