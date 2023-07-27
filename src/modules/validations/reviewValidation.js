import joi from 'joi'

export const createReviewSchema = joi.object({
  product: joi.string().hex().length(24).trim().required(),
  rating: joi.number().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number.',
    'number.empty': 'Rating is required.',
    'number.min': 'Rating cannot be less than 1.',
    'number.max': 'Rating cannot be more than 5.',
    'any.required': 'Rating is required.',
  }),
  comment: joi.string()
    .required()
    .trim()
    .min(2)
    .max(200)
    .messages({
      'string.base': 'comment must be a string.',
      'string.empty': 'comment is required.',
      'string.min': 'comment must be at least 2 characters.',
      'string.max': 'comment cannot exceed 50 characters.',
      'any.required': 'comment is required.',
    }),
})

export const updateReviewSchema = joi.object({
  id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'iD must be a string.',
      'string.empty': 'iD is required.',
      'any.required': 'iD is required.',
    }),
  product: joi.string().hex().length(24).trim().required(),
  rating: joi.number().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number.',
    'number.empty': 'Rating is required.',
    'number.min': 'Rating cannot be less than 1.',
    'number.max': 'Rating cannot be more than 5.',
    'any.required': 'Rating is required.',
  }),
  comment: joi.string()
    .required()
    .trim()
    .min(2)
    .max(200)
    .messages({
      'string.base': 'comment must be a string.',
      'string.empty': 'comment is required.',
      'string.min': 'comment must be at least 2 characters.',
      'string.max': 'comment cannot exceed 50 characters.',
      'any.required': 'comment is required.',
    }),
})


export const reviewIdSchema = joi.object({
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
