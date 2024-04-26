const usersDb = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

//Funktion för signup
async function postSignUp(req, res) {
  const { username, password } = req.body;
  const usernameExists = await usersDb.findOne({ username: username });

  if (usernameExists) {
    return res
      .status(400)
      .json({ success: false, message: 'Username already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSignup = {
      userId: uuidv4(),
      username: username,
      password: hashedPassword, // Save hashed password to the database
    };

    await usersDb.insert(newSignup);
    res.status(201).json({ success: true });
  } catch (e) {
    console.error('Error during signup:', e);
    res.status(500).send('Server error');
  }
}

async function postLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await usersDb.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password' });
    }

    // Generate JWT token
    const userId = user.userId;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);

    // Log the JWT token
    console.log('JWT Token:', token);

    res
      .header('Authorization', token)
      .status(200)
      .json({ success: true, token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {

    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized: Missing token' });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.userId;

    next();
  });
}

module.exports = {
  postSignUp,
  postLogin,
  verifyToken,
};
