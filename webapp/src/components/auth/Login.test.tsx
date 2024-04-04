import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './Login';
import { login } from '../../services/auth-service';

jest.mock('../../services/auth-service');

const mockLogin = login as jest.MockedFunction<typeof login>;

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Login postRegisterText="" />);
  });

  test('updates username and password inputs correctly', () => {
    render(<Login postRegisterText="" />);
    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  test('displays error message when login fails', async () => {
    mockLogin.mockResolvedValueOnce(false);
    render(<Login postRegisterText="" />);

    const loginButton = screen.getByRole('button', { name: 'Log in' });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText('Error: Invalid Credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays post-register text when provided', () => {
    const postRegisterText = 'You have successfully registered!';
    render(<Login postRegisterText={postRegisterText} />);

    const textElement = screen.getByText(postRegisterText);
    expect(textElement).toBeInTheDocument();
  });
});