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

});