import joi from 'joi'

export const WishlistIdSchema = joi.object({
  product: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'iD must be a string.',
      'string.empty': 'iD is required.',
      'any.required': 'iD is required.',
    }),
})
