import joi from 'joi'

export const createProductSchema = joi.object({
  title: joi.string()
    .required()
    .trim()
    .min(2)
    .messages({
      'string.base': 'Title must be a string.',
      'string.empty': 'Title is required.',
      'string.min': 'Title must be at least 2 characters.',
      'any.required': 'Title is required.',
    }),
  slug: joi.string()
    .lowercase(),
  description: joi.string()
    .trim()
    .required()
    .min(5)
    .max(300)
    .messages({
      'string.base': 'Description must be a string.',
      'string.empty': 'Description is required.',
      'string.min': 'Description must be at least 5 characters.',
      'string.max': 'Description cannot exceed 300 characters.',
      'any.required': 'Description is required.',
    }),
  price: joi.number()
    .required()
    .min(0)
    .messages({
      'number.base': 'Price must be a number.',
      'number.empty': 'Price is required.',
      'number.min': 'Price cannot be negative.',
      'any.required': 'Price is required.',
    }),
  quantity: joi.number()
    .default(0)
    .min(0)
    .required()
    .messages({
      'number.base': 'Quantity must be a number.',
      'number.empty': 'Quantity is required.',
      'number.min': 'Quantity cannot be negative.',
      'any.required': 'Quantity is required.',
    }),
  coverImg: joi.string(),
  images: joi.array()
    .items(joi.string()),
  category: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Category must be a string.',
      'string.empty': 'Category is required.',
      'any.required': 'Category is required.',
    }),
  subCategory: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Subdivision category must be a string.',
      'string.empty': 'Subdivision category is required.',
      'any.required': 'Subdivision category is required.',
    }),
  brand: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Brand must be a string.',
      'string.empty': 'Brand is required.',
      'any.required': 'Brand is required.',
    }),
});
export const updateProductSchema = joi.object({
  id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'iD must be a string.',
      'string.empty': 'iD is required.',
      'any.required': 'iD is required.',
    }),
  title: joi.string()
    .required()
    .trim()
    .min(2)
    .messages({
      'string.base': 'Title must be a string.',
      'string.empty': 'Title is required.',
      'string.min': 'Title must be at least 2 characters.',
      'any.required': 'Title is required.',
    }),
  slug: joi.string()
    .lowercase(),
  description: joi.string()
    .trim()
    .required()
    .min(5)
    .max(300)
    .messages({
      'string.base': 'Description must be a string.',
      'string.empty': 'Description is required.',
      'string.min': 'Description must be at least 5 characters.',
      'string.max': 'Description cannot exceed 300 characters.',
      'any.required': 'Description is required.',
    }),
  price: joi.number()
    .required()
    .min(0)
    .messages({
      'number.base': 'Price must be a number.',
      'number.empty': 'Price is required.',
      'number.min': 'Price cannot be negative.',
      'any.required': 'Price is required.',
    }),
  quantity: joi.number()
    .default(0)
    .min(0)
    .required()
    .messages({
      'number.base': 'Quantity must be a number.',
      'number.empty': 'Quantity is required.',
      'number.min': 'Quantity cannot be negative.',
      'any.required': 'Quantity is required.',
    }),
  coverImg: joi.string(),
  images: joi.array()
    .items(joi.string()),
  category: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Category must be a string.',
      'string.empty': 'Category is required.',
      'any.required': 'Category is required.',
    }),
  subCategory: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Subdivision category must be a string.',
      'string.empty': 'Subdivision category is required.',
      'any.required': 'Subdivision category is required.',
    }),
  brand: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Brand must be a string.',
      'string.empty': 'Brand is required.',
      'any.required': 'Brand is required.',
    }),
});


export const productIdSchema = joi.object({
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

