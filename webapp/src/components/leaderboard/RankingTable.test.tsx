import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RankingTable, { User } from './RankingTable';
import { getAllUsers } from "../../services/auth-service";
import { act } from 'react-dom/test-utils'; // import act


jest.mock('../../services/auth-service');

describe('RankingTable', () => {
  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValue({
      user1: { username: 'user1', correctly_answered_questions: 5, questions_answered: 10 },
      user2: { username: 'user2', correctly_answered_questions: 3, questions_answered: 10 },
      user3: { username: 'user3', correctly_answered_questions: 7, questions_answered: 10 },
    });
  });

  it('renders without crashing', () => { 
    render(<RankingTable />);
  });

  it('displays users sorted by correct answers', async () => {
    await act(async () => { // wrap render in act
      render(<RankingTable />);
  });
      
    // Wait for users to load
    const userNames = await screen.findAllByRole('cell', { name: /user\d/i });
    expect(userNames[0]).toHaveTextContent('user3');
    expect(userNames[1]).toHaveTextContent('user1');
    expect(userNames[2]).toHaveTextContent('user2');
  });

  it('displays correct answers for each user', async () => {
    await act(async () => { // wrap render in act
        render(<RankingTable />);
    });
    
    // Wait for users to load
    const correctAnswersUser0 = await screen.findByTestId('user-0-correct-answers');
    const correctAnswersUser1 = await screen.findByTestId('user-1-correct-answers');
    const correctAnswersUser2 = await screen.findByTestId('user-2-correct-answers');
    
    expect(correctAnswersUser0).toHaveTextContent('7');
    expect(correctAnswersUser1).toHaveTextContent('5');
    expect(correctAnswersUser2).toHaveTextContent('3');
});

  it('displays correct percentage of correct answers for each user', async () => {
    await act(async () => { // wrap render in act
      render(<RankingTable />);
    });
      
    // Wait for users to load
    const percentageUser0 = await screen.findByTestId('user-0-percentage');
    const percentageUser1 = await screen.findByTestId('user-1-percentage');
    const percentageUser2 = await screen.findByTestId('user-2-percentage');
    
    expect(percentageUser0).toHaveTextContent('70%');
    expect(percentageUser1).toHaveTextContent('50%');
    expect(percentageUser2).toHaveTextContent('30%');
  });
});