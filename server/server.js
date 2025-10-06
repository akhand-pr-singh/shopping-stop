// Import the shared app configuration
const app = require('./app');

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  });
}

module.exports = app;