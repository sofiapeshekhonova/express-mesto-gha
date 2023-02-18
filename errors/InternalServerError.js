const { INTERNAL_SERVERE_ERROR } = require('./errors_constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = INTERNAL_SERVERE_ERROR;
  }
}

module.exports = InternalServerError;
