export const SchemaValidation = (schema) => {
  return (req, res, next) => {
    console.log('Validation middleware called. 🔍\n');
    const inputs = { ...req.body, ...req.params, ...req.query }
    const { error } = schema.validate(inputs, { abortEarly: false });
    if (!error) {
      next()
    } else {
      res.status(406).send('Error/' + error);
    }
  }
}