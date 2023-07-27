// This function takes in a function as an argument and returns a new function that catches any errors that occur when the original function is called
export function catchErrors(fn) {
  return (req, res, next) => {
    // The returned function calls the original function and catches any errors that occur
    fn(req, res, next).catch((err) => {
      // If an error occurs, the function passes it to the next middleware function
      next(err);
    })
  }
}