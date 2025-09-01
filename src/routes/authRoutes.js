const express = require('express');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/authController');

const router = express.Router();

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for registration
const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

// Validation rules for login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Validation rules for token refresh
const refreshTokenValidation = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required')
];

// Validation rules for logout
const logoutValidation = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required')
];

// Register a new user
router.post(
  '/register',
  registerValidation,
  validate,
  asyncHandler(authController.register)
);

// User login
router.post(
  '/login',
  loginValidation,
  validate,
  asyncHandler(authController.login)
);

// Refresh JWT access token
router.post(
  '/refresh-token',
  refreshTokenValidation,
  validate,
  asyncHandler(authController.refreshToken)
);

// Logout (invalidate refresh token)
router.post(
  '/logout',
  logoutValidation,
  validate,
  asyncHandler(authController.logout)
);

module.exports = router;
