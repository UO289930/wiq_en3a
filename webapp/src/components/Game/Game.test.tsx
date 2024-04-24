import { render, screen } from '@testing-library/react';
import React from 'react';
import Game from './Game';


describe('Game component', () => {
  it('should render the game', () => {
    render( <Game difficulty='easy'/> );
    expect(screen.getByTestId('game-component')).toBeInTheDocument();
  });

 
});