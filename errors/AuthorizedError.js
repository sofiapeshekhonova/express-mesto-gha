const { AUTHORIZED_ERROR } = require('./errors_constants');

class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizedError';
    this.statusCode = AUTHORIZED_ERROR;
  }
}

module.exports = AuthorizedError;
