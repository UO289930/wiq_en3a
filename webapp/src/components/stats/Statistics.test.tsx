import React from 'react';
import { render, act, screen} from '@testing-library/react';
import { useUserStore } from '../../stores/user-store';
import { getUser } from "../../services/auth-service";
import Statistics from './Statistics';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../stores/user-store');
jest.mock('../../services/auth-service');

describe('Statistics component', () => {
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
});