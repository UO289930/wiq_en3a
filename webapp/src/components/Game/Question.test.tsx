import React from 'react';
import { render, screen } from '@testing-library/react';
import Question from './Question';

describe('Question component', () => {
  it('should render the question text correctly', () => {
    const questionText = 'What is the capital of France?';
    render(<Question questionText={questionText} />);
    expect(screen.getByText(questionText)).toBeInTheDocument();
  });

});