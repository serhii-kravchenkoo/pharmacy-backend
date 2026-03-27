import { Joi, Segments } from 'celebrate';

export const checkoutSchema = {
  [Segments.BODY]: Joi.object({
    userName: Joi.string().min(2).max(50).required().messages({
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

    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is required',
    }),

    address: Joi.string().min(5).required().messages({
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
