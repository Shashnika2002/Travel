// Import Mongoose library - an ODM library for MongoDB and Node.js that provides a schema-based abstraction over MongoDB.
const mongoose = require('mongoose');

// Define the User Schema - sets up a schema and model for a user.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    password: { type: String, required: true }, // User's password
    isAdmin: { type: Boolean, default: false, required: true }, // Boolean flag for admin privileges
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields to the document
  }
);

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Export the model
module.exports = User;
