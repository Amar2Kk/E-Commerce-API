import joi from 'joi'

export const createAddressSchema = joi.object({
  street: joi.string()
    .trim()
    .min(5)
    .max(100)
    .lowercase()
    .required()
    .messages({
      'string.base': 'Street must be a string.',
      'string.empty': 'Street is required.',
      'string.min': 'Street must be at least 2 characters.',
      'string.max': 'Street cannot exceed 50 characters.',
      'any.required': 'Street is required.',
    }),
  city: joi.string()
    .trim()
    .min(2)
    .max(50)
    .lowercase()
    .required()
    .messages({
      'string.base': 'City must be a string.',
      'string.empty': 'City is required.',
      'string.min': 'City must be at least 2 characters.',
      'string.max': 'City cannot exceed 50 characters.',
      'any.required': 'City is required.',
    }),
  phoneNumber: joi.string()
    .trim()
    .required()
    .pattern(/^\+?\d{1,3}?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
    .messages({
      'string.base': 'Phone number must be a string.',
      'string.pattern.base': 'Please enter a valid phone number.'
    }),
})

export const deleteSchema = joi.object({
  address: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Address must be a string.',
      'string.empty': 'Address is required.',
      'any.required': 'Address is required.',
    })
})


