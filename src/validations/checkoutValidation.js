import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const updateCartSchema = {
  [Segments.BODY]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required().messages({
      'string.empty': 'Product ID is required',
    }),

    quantity: Joi.number().integer().min(1).required().messages({
      'number.base': 'Quantity must be a number',
      'number.min': 'Quantity must be at least 1',
    }),
  }),
};

export const checkoutSchema = {
  [Segments.BODY]: Joi.object({
    userName: Joi.string().trim().min(2).max(50).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name should have at most 50 characters',
    }),

    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must be valid (e.g. +380XXXXXXXXX)',
        'string.empty': 'Phone is required',
      }),

    email: Joi.string().email().trim().required().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is required',
    }),

    address: Joi.string().trim().min(5).required().messages({
      'string.empty': 'Address is required',
      'string.min': 'Address must be at least 5 characters',
    }),
    paymentMethod: Joi.string()
      .valid('Cash On Delivery', 'Bank')
      .required()
      .messages({
        'any.only': 'Invalid payment method',
        'string.empty': 'Payment method is required',
      }),
  }),
};
