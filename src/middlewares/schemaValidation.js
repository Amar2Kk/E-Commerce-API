export const SchemaValidation = (schema) => {
  return (req, res, next) => {
    console.log('Validation middleware called. 🔍\n');
    const inputs = { ...req.body, ...req.params, ...req.query }
    const { error } = schema.validate(inputs, { abortEarly: false });
    if (!error) {
      next();
    } else {
      const validationErrors = error.details.map(detail => detail.message);
      res.status(406).json({ status: 'fail', errors: validationErrors });
    }
  }
}
