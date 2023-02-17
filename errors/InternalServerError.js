const {internal_servere_error} = require('./errors_constants')

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = internal_servere_error;
  }
}

module.exports = InternalServerError;