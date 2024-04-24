const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Login-tut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('added-products', productSchema);

// Middleware
app.use(bodyParser.json());

// Route to handle POST request for adding a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, category, price, image } = req.body;
    const product = new Product({ name, description, category, price, image });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

