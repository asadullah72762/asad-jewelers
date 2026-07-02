const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read products from JSON file
const getProducts = () => {
  const filePath = path.join(__dirname, '../data/products.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// GET /api/products - Get all products
router.get('/', (req, res) => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p._id === req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// GET /api/products/category/:category - Get by category
router.get('/category/:category', (req, res) => {
  try {
    const products = getProducts();
    const filtered = products.filter(
      p => p.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
