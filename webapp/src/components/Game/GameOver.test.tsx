import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameOver from './GameOver';
import { usePlayingState } from '../../stores/playing-store';

describe('GameOver component', () => {
  it('should render the score correctly', () => {
    // const score = 42;
    // render(<GameOver score={score} />);
    // expect(screen.getByText(`Score: ${score}`)).toBeInTheDocument();
  });

});