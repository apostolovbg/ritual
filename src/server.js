import 'dotenv/config';
import app from './app.js';

// Determine the port from env or fall back to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
