import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Countdown from './Countdown';

describe('Countdown component', () => {
  const mockedProps = {
    duration: 3,
  };

  test('Countdown renders', () => {
    render(<Countdown {...mockedProps}/>);
  
    expect(screen.getByText('Next Question In: 3')).toBeInTheDocument();
  });
});

