import joi from 'joi'

export const createBrandSchema = joi.object({
  name: joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 2 characters.',
      'string.max': 'Name cannot exceed 50 characters.',
      'any.required': 'Name is required.',
    }),
  logo: joi.string().trim()
})

export const updateBrandSchema = joi.object({
  id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'iD must be a string.',
      'string.empty': 'iD is required.',
      'any.required': 'iD is required.',
    }),
  name: joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 2 characters.',
      'string.max': 'Name cannot exceed 50 characters.',
      'any.required': 'Name is required.',
    }),
  logo: joi.string().trim()
})


export const brandIdSchema = joi.object({
  id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'iD must be a string.',
      'string.empty': 'iD is required.',
      'any.required': 'iD is required.',
    })
})


