const express = require('express');
const app = express();
const PORT = 3000; // you can change this

// Middleware (optional)
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, backend is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
