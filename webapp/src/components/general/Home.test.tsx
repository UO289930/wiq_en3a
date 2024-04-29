import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter

describe('Home component', () => {

  it('should update selectedOption state when radio button is clicked', () => {
    render(
      <Router> 
        <Home />
      </Router>
    );

    const radioButton = screen.getByLabelText('Easy'); // Obtén el radio button por su etiqueta
    fireEvent.click(radioButton); // Simula un clic en el radio button

    expect(screen.getByLabelText('Easy')).toBeChecked(); // Verifica que el radio button esté marcado
    expect(screen.queryByLabelText('Hard')).not.toBeChecked(); // Verifica que el otro radio button no esté marcado

    fireEvent.click(screen.getByLabelText('Hard')); // Simula un clic en el otro radio button

    expect(screen.getByLabelText('Hard')).toBeChecked(); // Verifica que el otro radio button esté marcado
    expect(screen.queryByLabelText('Easy')).not.toBeChecked(); // Verifica que el primer radio button no esté marcado
  });

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