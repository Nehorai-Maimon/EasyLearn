import app from './app.js';

// Define port with fallback
const PORT = process.env.PORT || 5000;

// Start HTTP server
app.listen(PORT, () => {
  console.log(`[EasyLearn API] Server running successfully on port ${PORT}`);
});
