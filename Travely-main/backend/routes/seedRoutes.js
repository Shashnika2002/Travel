const express = require('express');
const data = require("../data.js");//('../data.js');
const Product = require("../models/productModel.js");//('../models/productModel.js');
const User = require("../models/userModels.js");//('../models/userModels.js');
const axios = require('axios');
const cheerio = require('cheerio');
const { createObjectCsvWriter: createCsvWriter } = require('csv-writer');
const fs = require('fs');

// Create an Express router instance
const seedRouter = express.Router();

// Route for seeding the database
seedRouter.get('/', async (req, res) => {
  try {
    // Clear existing products and users
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert new products and users from the data module
    const createdProducts = await Product.insertMany(data.products);
    const createdUsers = await User.insertMany(data.users);

    // Send a response with the created data
    res.send({ createdProducts, createdUsers });
  } catch (error) {
    console.error('Error during seeding:', error);
    res.status(500).send({ message: 'Seeding failed', error });
  }
});

// Export the router
module.exports = seedRouter;
