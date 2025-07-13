import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mocks for window.fetch and localStorage could be added in advanced tests

// Integration smoke test: renders main UI depending on auth state
test('renders login form or notes interface', async () => {
  render(<App />);
  // Should show login form or notes interface - check for known element/text
  await waitFor(() => {
    // Accept either login (when not authenticated) or the app header (when auto-login with token)
    expect(
      screen.queryByText(/sign in/i) ||
      screen.queryByText(/📝 Notes App/i) ||
      screen.queryByRole('button', { name: /login/i })
    ).toBeTruthy();
  });
});
