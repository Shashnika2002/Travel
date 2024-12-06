const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Reviewer's name
    rating: { type: Number, required: true }, // Rating given by the reviewer
    comment: { type: String, required: true }, // Reviewer's comment
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Product name
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL
    image: { type: String, required: true }, // Image URL
    brand: { type: String, required: true }, // Brand name
    category: { type: String, required: true }, // Product category
    description: { type: String, required: true }, // Product description
    price: { type: Number, required: true }, // Product price
    countInStock: { type: Number, required: true }, // Available stock
    rating: { type: Number, required: true }, // Average product rating
    numReviews: { type: Number, required: true }, // Total number of reviews
    reviews: [reviewSchema], // Array of review objects
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
