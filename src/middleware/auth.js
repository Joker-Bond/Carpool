const jwt = require('jsonwebtoken');

/**
 * Authentication middleware that verifies JWT token.
 * Expects the token in the 'Authorization' header as 'Bearer <token>'.
 * On success, attaches the decoded payload to req.user.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT secret not configured');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    // Attach user information to request object
    req.user = decoded;
    next();
  });
}

/**
 * Authorization middleware generator.
 * Pass an array of allowed roles (e.g., ['admin', 'user']).
 * The middleware checks req.user.role against the allowed list.
 */
function authorize(allowedRoles) {
  if (!Array.isArray(allowedRoles)) {
    throw new Error('allowedRoles must be an array');
  }
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorize,
};