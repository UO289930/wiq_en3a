import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter component', () => {
  const mockedProps = {
    answered: false,
    setAnswered: jest.fn(),
    duration: 1000,
    count: 0,
    setCount: jest.fn(),
    initialCount: 1000,
   };

  test('renders the counter', () => {
    render(<Counter {...mockedProps} />);
    expect(screen.findByTestId('counter'));
  });

  // test('checks that the progress bar decreases in time', () => {
  //   // Importa la función que simula el paso del tiempo
  //   jest.useFakeTimers();
  //   render(<Counter {...mockedProps} />);
    
  //   jest.advanceTimersByTime(10000);

  //   expect(screen.findByTestId('counter'));
  // });

  
});