import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter

describe('Home component', () => {
  it('should render the "Start Game!" button when not playing', () => {
    render(
      <Router> 
        <Home />
      </Router>
    );
    expect(screen.getByText('Normal Game')).toBeInTheDocument();
    expect(screen.getByText('Trivia Game')).toBeInTheDocument();
  });

  it('should render the Normal Game component when playing', () => {
    render(
      <Router> 
        <Home />
      </Router>
    );

    fireEvent.click(screen.getByText('Normal Game'));
    setTimeout(function(){
        expect(screen.getByTestId('game-component')).toBeInTheDocument();
    }, 1000);
    
  });

  it('should render the Trivia Game component when playing', () => {
    render(
      <Router> 
        <Home />
      </Router>
    );

    fireEvent.click(screen.getByText('Trivia Game'));
    setTimeout(function(){
        expect(screen.getByTestId('trivia-game-component')).toBeInTheDocument();
    }, 1000);

  });

});