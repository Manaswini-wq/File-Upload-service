const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const { connectDB } = require('./models/db');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
}));

// Database connection
connectDB();

// Routes
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
