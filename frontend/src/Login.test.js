/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from './AuthContext.js';
import Login from './pages/Login.js';

// Ensure the login form saves the returned JWT to localStorage
test('login stores token in localStorage', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ access_token: 'abc' })
  });

  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });
  fireEvent.click(screen.getByText('Login'));

  await screen.findByText('Login');
  expect(localStorage.getItem('token')).toBe('abc');
});
