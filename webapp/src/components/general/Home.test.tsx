import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';

describe('Home component', () => {
  it('should render the "Start Game!" button when not playing', () => {
    render(<Home />);
    expect(screen.getByText('Start Game!')).toBeInTheDocument();
  });

  it('should render the Game component when playing', () => {

    render(<Home />);
    fireEvent.click(screen.getByText('Start Game!'));
    setTimeout(function(){
        expect(screen.getByTestId('game-component')).toBeInTheDocument();
    }, 1000);
    
  });

  it('should render the alert dialog when show dialog is true', () => {

    render(<Home />);
    fireEvent.click(screen.getByText('Start Game!'));
    setTimeout(function(){
        expect(screen.getByTestId('game-component')).toBeInTheDocument();
    }, 0);
    fireEvent.click(screen.getByText('Home'));
    setTimeout(function(){
        expect(screen.getByText('Are you sure you want to leave the game?')).toBeInTheDocument();
    }, 0);

  });

});