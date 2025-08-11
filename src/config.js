// Centralized configuration module for environment-derived settings.
// This ensures critical values are defined and documents why they matter.

// Read the JWT secret from the environment at startup. Throwing an error
// here prevents the application from accidentally running with a default
// or insecure value.
//
// Jest automatically sets `NODE_ENV` to "test". In that environment we fall
// back to a deterministic secret so contributors do not need to export
// `JWT_SECRET` just to execute the test suite. Production and development
// modes still require the variable to be explicitly defined.
export const jwtSecret = (() => {
  // Allow tests to run without manual environment configuration.
  const secret =
    process.env.JWT_SECRET ||
    (process.env.NODE_ENV === 'test' ? 'test-secret' : null);
  if (!secret) {
    throw new Error('JWT_SECRET must be defined in environment variables');
  }
  return secret;
})();

