import 'dotenv/config';
import app from './app.js';

// Entry point that starts the HTTP server.
// Determine the port from env or fall back to 3000
const PORT = process.env.PORT || 3000;
// Kick off Express and log the bound port for visibility during development
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
