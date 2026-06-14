
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// POST /register - Register a new user
const registerUser = async (req, res,next) => {
  try {

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required - name, email, password'
      });
    }

    // Name must be at least 3 characters long
    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 3 characters long'
      });
    }

    // Password must be at least 6 characters longPassword must be at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check whether the email is already registered or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    // Create a JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log('REGISTER ERROR:', error)
    // Duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// POST /login -Log in the user
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find the user — also select the password
    const user = await User.findOne({ email }).select('+password');

    // If user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Match the passwords
    const isPasswordMatch = await user.comparePassword(password);

    // If the password does not match
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = { registerUser, loginUser };