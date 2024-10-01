import * as yup from 'yup';

// Login Schema
export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

// Register Schema
export const registerSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters long')
});

// Checkout Schema
export const checkoutSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  cardholderName: yup
    .string()
    .required('Cardholder name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Cardholder name must contain only letters and spaces'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format')
    .test('is-expiry-valid', 'Expiry date is invalid or has passed', (value) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last two digits
      const currentMonth = currentDate.getMonth() + 1; // January is 0, need +1 to align with months (1-12)
      const [expMonth, expYear] = value.split('/').map(Number);
      if (expYear < currentYear) return false; // Year has passed
      if (expYear === currentYear && expMonth < currentMonth) return false; // Same year but month has passed
      return true;
    }),
  securityCode: yup
    .string()
    .required('Security code is required')
    .matches(/^[0-9]{3,4}$/, 'Security code must be 3 or 4 digits')
});

// Forgot Password Schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
});

// Reset Password Schema
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
