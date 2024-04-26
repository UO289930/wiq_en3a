import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsTable from './StatsTable';
import { getUser } from '../../services/auth-service';


describe('Statistics component', () => {
  it('renders without crashing', () => {
    render(<StatsTable />);
    expect(screen.getByTestId('stats-table')).toBeInTheDocument();
  });

  it('renders shows the titles', () => {
    render(<StatsTable />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('fetches user data and updates state on mount', async () => {
    const mockUser = {
      username: 'rita',
      questions_answered: 10,
      correctly_answered_questions: 8,
      cheeseCount: 2 
    };

    getUser(mockUser.username);

    const { getByTestId } = render(<StatsTable />);

    await (() => {
      expect(getUser).toHaveBeenCalledTimes(1);
      expect(getUser).toHaveBeenCalledWith('rita');
      expect(getByTestId('username')).toHaveTextContent('rita');
      expect(getByTestId('correct-answers')).toHaveTextContent('10');
      expect(getByTestId('wrong-answers')).toHaveTextContent('2'); 
      expect(getByTestId('percentage-correct')).toHaveTextContent('80%');
    });
  });

  
});