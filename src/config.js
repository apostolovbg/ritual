// Centralized configuration module for environment-derived settings.
// This ensures critical values are defined and documents why they matter.

// Read the JWT secret from the environment at startup. Throwing an error
// here prevents the application from accidentally running with a default
// or insecure value.
export const jwtSecret = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET must be defined in environment variables');
  }
  return secret;
})();

