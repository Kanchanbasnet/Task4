const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product'
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
