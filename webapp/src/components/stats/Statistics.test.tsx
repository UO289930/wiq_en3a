import React from 'react';
import { render, act, screen} from '@testing-library/react';
import { useUserStore } from '../../stores/user-store';
import { getUser } from "../../services/auth-service";
import Statistics from './Statistics';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../stores/user-store');
jest.mock('../../services/auth-service');

describe('Statistics component', () => {
  let originalConsoleError;

  beforeAll(() => {
    // Guardar la función original de console.error
    originalConsoleError = console.error;
    // Sustituir console.error con una función mock
    console.error = jest.fn();
  });
  
  it('renders user information correctly', async () => {
    const mockUser = { username: 'testuser', email: 'testuser@example.com' };
    (useUserStore.getState as jest.Mock).mockReturnValue({ user: mockUser });
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    await act(async () => {
      render(<Router>
        <Statistics />
      </Router>);
    });

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('renders user information correctly', async () => {
    const mockUser = { username: 'testuser', email: 'testuser@example.com' };
    (useUserStore.getState as jest.Mock).mockReturnValue({ user: mockUser });
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    await act(async () => {
      render(<Router>
        <Statistics />
      </Router>);
    });

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('handles error during user retrieval', async () => {
    const errorMessage = 'Failed to retrieve user';
    const mockError = new Error(errorMessage);
    (useUserStore.getState as jest.Mock).mockReturnValue({ user: { username: 'testuser' } });
    (getUser as jest.Mock).mockRejectedValue(mockError);

    await act(async () => {
      render(<Router>
        <Statistics />
      </Router>);
    });

    // Verifica que console.error haya sido llamado con el mensaje de error correcto
    expect(console.error).toHaveBeenCalledWith('Error during retrieving the user', mockError);
  });
}); 