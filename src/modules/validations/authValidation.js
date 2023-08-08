import joi from 'joi'

export const signUpSchema = joi.object({
  username: joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      'string.base': 'Username must be a string.',
      'string.empty': 'Username is required.',
      'string.min': 'Username must be at least 2 characters.',
      'string.max': 'Username cannot exceed 50 characters.',
      'any.required': 'Username is required.',
    }),
  email: joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
    }),
  password: joi.string()
    .required()
    // .pattern(/^ (?=.*? [A - Z])(?=.*? [a - z])(?=.*? [0 - 9])(?=.*? [# ? !@$ %^&* -]).{ 8, }$/)
    .min(6)
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.min': 'Password should be at least 6 characters long.',
      'any.required': 'Password is required.'
    }),
  phoneNumber: joi.string()
    .trim()
    .pattern(/^\+?\d{1,3}?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
    .messages({
      'string.base': 'Phone number must be a string.',
      'string.pattern.base': 'Please enter a valid phone number.'
    }),
  age: joi.number()
    .integer()
    .min(12)
    .max(120)
    .messages({
      'number.base': 'Age must be a number.',
      'number.integer': 'Age must be an integer.',
      'number.min': 'Age must be a positive number.',
      'number.max': 'Age must be less than or equal to 120.'
    }),
})


export const LoginSchema = joi.object({
  email: joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
    }),
  password: joi.string()
    .required()
    // .pattern(/^ (?=.*? [A - Z])(?=.*? [a - z])(?=.*? [0 - 9])(?=.*? [# ? !@$ %^&* -]).{ 8, }$/)
    .min(6)
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.min': 'Password should be at least 6 characters long.',
      'any.required': 'Password is required.'
    })
})