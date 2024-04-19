import { render, screen } from '@testing-library/react';
import React from 'react';
import {TriviaGame} from './TriviaGame';


describe('Game component', () => {
  it('should render the game', () => {
    render( <TriviaGame difficulty='easy'/> );
    expect(screen.getByTestId('trivia-game-component')).toBeInTheDocument();
  });

  it('should render the game in hard mode', () => {
    render( <TriviaGame difficulty='hard'/> );
    expect(screen.getByTestId('lifes')).toBeInTheDocument();
  });
});