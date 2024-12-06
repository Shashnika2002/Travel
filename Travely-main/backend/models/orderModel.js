const mongoose = require('mongoose');

// Define the schema for an order in the database
const orderSchema = new mongoose.Schema(
  {
    // Array of items in the order
    orderItems: [
      {
        slug: { type: String, required: true }, // Product slug for SEO
        name: { type: String, required: true }, // Product name
        quantity: { type: Number, required: true }, // Quantity of the product
        image: { type: String, required: true }, // Product image URL
        price: { type: Number, required: true }, // Price of a single unit
        product: {
          type: mongoose.Schema.Types.ObjectId, // Reference to Product model
          ref: 'Product',
          required: true,
        },
      },
    ],

    // Shipping address details
    shippingAddress: {
      fullName: { type: String, required: true }, // Recipient's full name
      address: { type: String, required: true }, // Street address
      city: { type: String, required: true }, // City
      postalCode: { type: String, required: true }, // Postal code
      country: { type: String, required: true }, // Country
    },

    // Payment details
    paymentMethod: { type: String, required: true }, // Payment method chosen by the user
    paymentResult: {
      id: String, // Payment gateway ID
      status: String, // Payment status
      update_time: String, // Time of payment status update
      email_address: String, // Email address associated with the payment
    },

    // Order price details
    itemsPrice: { type: Number, required: true }, // Total price of items
    shippingPrice: { type: Number, required: true }, // Shipping cost
    taxPrice: { type: Number, required: true }, // Tax amount
    totalPrice: { type: Number, required: true }, // Total order cost

    // User placing the order
    user: { type: String, required: true }, // User ID or username

    // Order status
    isPaid: { type: Boolean, default: false }, // Payment status
    paidAt: { type: Date }, // Payment timestamp
    isDelivered: { type: Boolean, default: false }, // Delivery status
    deliveredAt: { type: Date }, // Delivery timestamp
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Order model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
