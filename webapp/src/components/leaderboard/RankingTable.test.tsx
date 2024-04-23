import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RankingTable, { User } from './RankingTable';
import { getAllUsers } from '../../services/auth-service';

jest.mock('../../services/auth-service');

describe('RankingTable', () => {
  it('renders users correctly', async () => {
    const mockUsers: { [key: string]: User } = {
      '1': { username: 'user1', correctAnswers: 5, totalAnswers: 10 },
      '2': { username: 'user2', correctAnswers: 7, totalAnswers: 10 },
      '3': { username: 'user3', correctAnswers: 3, totalAnswers: 10 },
    };

    (getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    await act(async () => {
      render(<RankingTable />);
    });

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
      expect(screen.getByText('user3')).toBeInTheDocument();
    });
  });

  it('handles error during fetching users', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    (getAllUsers as jest.Mock).mockRejectedValue(new Error('Error during fetching users'));

    await act(async () => {
      render(<RankingTable />);
    });

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error during retrieving all the users', new Error('Error during fetching users'));
    });

    consoleError.mockRestore();
  });
});