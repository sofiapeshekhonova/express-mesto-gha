const {not_found} = require('./errors_constants')

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;