const {not_found} = require('./errors_constants')

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = not_found;
  }
}
module.exports = NotFoundError;