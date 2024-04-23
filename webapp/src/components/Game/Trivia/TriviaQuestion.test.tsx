import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TriviaQuestion, props } from './TriviaQuestion';

// Mock de las props
const mockProps: props = {
  questionShowed: {
    text: 'Test question',
    correctAnswer: 0,
    answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
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
});