import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddUser from './AddUser';
import { register } from '../../services/auth-service';

jest.mock('../../services/auth-service');

const mockRegister = register as jest.MockedFunction<typeof register>;

describe('AddUser', () => {
  const mockOnRegistrationCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<AddUser onRegistrationCompleted={mockOnRegistrationCompleted} />);
  });

  test('updates input fields correctly', () => {
    render(<AddUser onRegistrationCompleted={mockOnRegistrationCompleted} />);
    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');
    expect(confirmPasswordInput.value).toBe('testpassword');
  });

  test('displays error when passwords do not match', () => {
    render(<AddUser onRegistrationCompleted={mockOnRegistrationCompleted} />);
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

    const registerButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(registerButton);

    const errorMessage = screen.getByText('Error: Passwords do not match');
    expect(errorMessage).toBeInTheDocument();
  });

  
});