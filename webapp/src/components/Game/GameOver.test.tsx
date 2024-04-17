import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameOver from './GameOver';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter


describe('GameOver component', () => {
  it('should render the score correctly', () => {
    const questions = [
      { text: 'Question 1', answers: ['A', 'B', 'C'], correctAnswer: 0, wikiLink: '#' },
      { text: 'Question 2', answers: ['A', 'B', 'C'], correctAnswer: 1, wikiLink: '#' },
    ];
    const answers = ['A', 'B'];  
    
    render(
      <Router>
        <GameOver questions={questions} answers={answers}/>
      </Router>
    );


    expect(screen.getByText(`Score: 2 / 2`)).toBeInTheDocument();
  });

});