const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  // Check if the token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];  // This extracts the token after "Bearer"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request object
    req.user = decoded.user;
    next();
  } catch (error) {
    // If the token is invalid or cannot be verified
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
