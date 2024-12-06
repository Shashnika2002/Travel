const jwt = require('jsonwebtoken');

// Middleware for user authentication and authorization

// Generate a JSON Web Token (JWT) for user authentication.
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  // First parameter is the user's data, second is the JWT secret for encryption, third is the expiration option.
};

// Middleware to check if user is authenticated.
const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Extract token after "Bearer "
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;  // Store decoded user data in req.user
        next();  // Call the next middleware function
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

// Middleware to check if user is an admin.
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();  // Proceed to the next middleware if the user is an admin
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

module.exports = { generateToken, isAuth, isAdmin };
