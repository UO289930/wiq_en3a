import { render, fireEvent ,screen, waitFor } from '@testing-library/react';
import React from 'react';
import Game, { formatNumberWithDots} from './Game';
import { act } from 'react-dom/test-utils';

const wait = (milliseconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

jest.mock("../../services/question-service", () => {
  return {
      getHardString : () => 'hard',
      getQuestionsFromApi: () => {
        return Promise.resolve([
          {
            text: '¿Cuál es la capital de España?',
            correctAnswer: 0,
            answers: ['Madrid','Barcelona', 'Sevilla', 'Valencia'],
            wikiLink: ''
          },
          {
            text: '¿Cuál es la capital de Francia?',
            correctAnswer: 0,
            answers: ['Paris','Barcelona', 'Sevilla', 'Valencia'],
            wikiLink: ''
          }
        ]);
      }
  }
});

describe('Game component', () => { 
    
  
  it('should render the game',async () => {
    await act( async () => {
      render(<Game difficulty='easy'/>);
    });
    expect(screen.getByTestId('game-component')).toBeInTheDocument();
  });

  it('should render the game in hard mode',async () => {
    await act( async () => {
      render(<Game difficulty='hard'/>);
    });
    expect(screen.getByTestId('game-component')).toBeInTheDocument();
  });

  it('should go to the next question', async () => {
    await act( async () => {
      render(<Game difficulty='easy'/>);
    });

    expect(screen.getByTestId('game-container')).toBeInTheDocument();
    
    expect(screen.getByText('Madrid')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Madrid'));
    
    await wait(4000);
    expect(screen.getByText('Paris')).toBeInTheDocument();

  });

  it('format a number with the dots', () => {
    const shortNumber = '700';
    expect(formatNumberWithDots(shortNumber)).toBe('700');

    const number = '100000';
    expect(formatNumberWithDots(number)).toBe('100.000');
  });

  //mockear la llegada de preguntas de la api
  it('should display the question and answers when the questions arrive', async () => {

    await act( async () => {
      render(<Game difficulty='easy'/>);
    });

    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });

  

 
});