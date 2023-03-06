const { DUPLICATE_ERROR } = require('./errors_constants');

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateError';
    this.statusCode = DUPLICATE_ERROR;
  }
}

module.exports = DuplicateError;
