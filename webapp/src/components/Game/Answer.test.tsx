import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Answer from './Answer';

describe('Answer component', () => {
  const mockedProps = {
    answered: false,
    correctAnswer: true,
    answer: 'Correct Answer',
    score: 0,
    setAnswered: jest.fn(),
    setScore: jest.fn(),
    setCorrectSelected: jest.fn(),
  };

  // test('renders the answer', () => {
  //   render(<Answer {...mockedProps} />);
  //   expect(screen.getByText('Correct Answer')).toBeInTheDocument();
  // });

  // test('calls the setAnswered, setCorrectSelected, and setScore functions when clicked', () => {
  //   render(<Answer {...mockedProps} />);
  //   fireEvent.click(screen.getByText('Correct Answer'));
  //   expect(mockedProps.setAnswered).toHaveBeenCalledWith(true);
  //   expect(mockedProps.setCorrectSelected).toHaveBeenCalledWith(true);
  //   expect(mockedProps.setScore).toHaveBeenCalledWith(10);
  // });

  // test('changes the button class when answered', () => {
  //   render(<Answer {...mockedProps} answered={true} />);
  //   expect(screen.getByText('Correct Answer')).toHaveClass('bg-primary');
  // });

  // test('disables the button when answered', () => {
  //   render(<Answer {...mockedProps} answered={true} />);
  //   expect(screen.getByText('Correct Answer')).toBeDisabled();
  // });
});