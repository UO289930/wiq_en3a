import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Authentication from './Authentication';
import AddUser from './AddUser';

// Mock the AddUser component
jest.mock('./AddUser', () => {
    return jest.fn(() => <div>Mocked AddUser</div>) as jest.Mock;
  });

jest.mock('./Login', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Login</div>),
}));

describe('Authentication', () => {
  test('renders login tab by default', () => {
    render(<Authentication />);
    const loginTab = screen.getByText('Login');
    expect(loginTab).toBeInTheDocument();
  });

  test('switches to register tab when clicked', () => {
    render(<Authentication />);
    const registerTab = screen.getByText('Register');
    fireEvent.click(registerTab);
    const addUserComponent = screen.getByText('Register');
    expect(addUserComponent).toBeInTheDocument();
  });

});