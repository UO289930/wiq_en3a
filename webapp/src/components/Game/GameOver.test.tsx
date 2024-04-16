import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameOver from './GameOver';

describe('GameOver component', () => {
  it('should render the score correctly', () => {
    const score = 42;
    render(<GameOver />);
    expect(screen.getByText(`Score: ${score}`)).toBeInTheDocument();
  });

});