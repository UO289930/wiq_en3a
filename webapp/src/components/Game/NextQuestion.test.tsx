import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NextQuestion from './NextQuestion';
import { Button } from '../ui/button';

describe('NextQuestion component', () => {
  const mockedOnNextQuestion = jest.fn();

  test('renders the button with the correct text', () => {
    render(<NextQuestion onNextQuestion={mockedOnNextQuestion} />);
    expect(screen.getByText('Next Question ->'));
  });

  test('calls the onNextQuestion function when the button is clicked', () => {
    render(<NextQuestion onNextQuestion={mockedOnNextQuestion} />);
    fireEvent.click(screen.getByText('Next Question ->'));
    expect(mockedOnNextQuestion).toHaveBeenCalledTimes(1);
  });


});
