import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from './Nav';
import { create } from 'zustand';
import { handleShowDialog, usePlayingState, useStats } from '../../stores/playing-store';

jest.mock('../../stores/playing-store', () => ({
  handleShowDialog: jest.fn(),
  usePlayingState: jest.fn().mockReturnValue({
    stopPlaying: jest.fn(),
  }),
  useStats: jest.fn().mockReturnValue({
    questionsAnswered: 10,
    correctlyAnsweredQuestions: 8,
  }),
}));

const mockUserStore = create(() => ({
  user: {
    username: 'John Doe',
  },
  setUser: jest.fn(),
  logout: jest.fn(),
}));

jest.spyOn(require('../../stores/user-store'), 'useUserStore').mockReturnValue(mockUserStore);

describe('Nav component', () => {

  it('should call handleShowDialog when clicking the "Home" button', () => {
    render(<Nav />);
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    expect(handleShowDialog).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call handleShowDialog when clicking the "Logout" button', () => {
    render(<Nav />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(handleShowDialog).toHaveBeenCalledWith(expect.any(Function));
  });
});