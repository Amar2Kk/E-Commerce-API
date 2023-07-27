// This class extends the built-in Error class to create custom error objects that include a status code
export class AppError extends Error {
  // The constructor takes in a message and a status code and initializes the error object
  constructor(message, statusCode) {
    // The "super" calls the constructor of the parent class (Error) and sets the message property of the error object
    super(message);
    // The statusCode property is added to the error object
    this.statusCode = statusCode;
  }
}
