import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TriviaQuestion, props } from './TriviaQuestion';

// Mock de las props
const mockProps: props = {
  questionShowed: {
    text: 'Test question',
    correctAnswer: 0,
    answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    wikiLink: 'aaaaaaaaaaaa.com'
  },
  setIsShowingQuestion: jest.fn(),
  setColor: jest.fn(),
  color: 'red',
  saveAnswer: jest.fn(),
  setCategoriesPassed: jest.fn(),
  categoriesPassed: [],
  category: 1,
  setLifesNumber: jest.fn(),
  lifes: 3,
}; 

describe('TriviaQuestion', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TriviaQuestion {...mockProps} />);
    expect(getByText('Test question')).toBeInTheDocument();
  });

  it('calls setCorrectSelected with true when the correct answer is selected', async () => {
    const { getByText } = render(<TriviaQuestion {...mockProps} />);
    fireEvent.click(getByText('Answer 1'));
    await waitFor(() => expect(mockProps.setColor).toHaveBeenCalledWith(true));
  });

  it('calls setCorrectSelected with false when an incorrect answer is selected', async () => {
    const { getByText } = render(<TriviaQuestion {...mockProps} />);
    fireEvent.click(getByText('Answer 2'));
    await waitFor(() => expect(mockProps.setLifesNumber).toHaveBeenCalledWith(2));
  });

  it('calls setIsShowingQuestion(false) after 2 seconds when answered', async () => {
    jest.useFakeTimers(); // Activar el uso de temporizadores falsos

    const { getByText } = render(<TriviaQuestion {...mockProps} />);
    fireEvent.click(getByText('Answer 1'));

    // Avanzar en el tiempo en 2000ms
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockProps.setIsShowingQuestion).toHaveBeenCalledWith(false);
    });

    jest.useRealTimers(); // Restaurar temporizadores reales
  });

  it('returns "No question available" when question is null', () => {
    const { getByText } = render(<TriviaQuestion {...mockProps} questionShowed={null} />);
    expect(getByText('No question available')).toBeInTheDocument();
  });
});