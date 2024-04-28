const moment = require('moment');
const jwt = require('jsonwebtoken');

// created time for POST
function getCreatedAt() {
  return moment();
}

// Modified time for PUT
function getModifiedAt() {
  return moment();
}

// TOKEN VERIFYER
function tokenVerify(req, res, next) {
  // Check if Authorization header exists
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, attach userId to the request object
    req.userId = decoded.userId;
    next(); // Call next middleware
  });
}

module.exports = {
  tokenVerify,
  getModifiedAt,
  getCreatedAt,
};