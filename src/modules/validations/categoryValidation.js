import joi from 'joi'


export const createCategorySchema = joi.object({
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
  image: joi.string().trim(),
})

export const updateCategorySchema = joi.object({
  id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'iD must be a string.',
      'string.empty': 'iD is required.',
      'any.required': 'Brand is required.',
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
  image: joi.string().trim()
})

export const categoryIdSchema = joi.object({
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

