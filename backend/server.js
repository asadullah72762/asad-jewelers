const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== API Routes =====
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ===== Health Check Route =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Asad Jewelers API is running!',
    timestamp: new Date().toISOString()
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
});
