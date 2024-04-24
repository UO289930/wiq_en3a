import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TrivialRankingTable, { User } from './TrivialRankingTable';
import { getAllUsers } from '../../services/auth-service';
import { act } from '@testing-library/react';

jest.mock('../../services/auth-service');

describe('TrivialRankingTable', () => {
  const mockUsers: User[] = [
    { username: 'user1', correctAnswers: 10, totalAnswers: 20, cheeseCount: 5 },
    { username: 'user2', correctAnswers: 15, totalAnswers: 30, cheeseCount: 10 },
    { username: 'user3', correctAnswers: 5, totalAnswers: 10, cheeseCount: 0 },
  ];

  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<TrivialRankingTable />);
    });
  });  

  it('displays users with cheeseCount greater than 0', async () => {
    await act(async () => {
      render(<TrivialRankingTable />);
    });
    await waitFor(() => expect(getAllUsers).toHaveBeenCalled());

    expect(screen.getByText('user1')).toBeInTheDocument(); 
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.queryByText('user3')).not.toBeInTheDocument();
  });

  it('sorts users by cheeseCount in descending order', async () => {
    await act(async () => {
      render(<TrivialRankingTable />);
    });
    await waitFor(() => expect(getAllUsers).toHaveBeenCalled());

    const users = screen.getAllByTestId('user-row');
    expect(users[0]).toHaveTextContent('user2');
    expect(users[1]).toHaveTextContent('user1');
  });
});