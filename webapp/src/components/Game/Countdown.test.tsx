import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Countdown from './Countdown';

jest.useFakeTimers();

describe('Countdown component', () => {
  const mockedProps = {
    duration: 3,
  };

  test('Countdown renders', () => {
    render(<Countdown {...mockedProps}/>);
  
    expect(screen.getByText('Next Question In: 3')).toBeInTheDocument();
  });

  test('Countdown renders 3 and then 0 after the countdown', async () => {
    render(<Countdown {...mockedProps} />);
  
    expect(screen.getByText('Next Question In: 3')).toBeInTheDocument();
  
    // Avanzar el temporizador en 2 segundos
    jest.advanceTimersByTime(2000);
  
    // Comprobar que el texto sigue siendo 3 después de 2 segundos
    expect(screen.getByText('Next Question In: 3')).toBeInTheDocument();
  
    // Avanzar el temporizador en otros 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  
    // Comprobar que el texto ahora es 0 después de 3 segundos en total
    act(() => {
      expect(screen.getByText('Next Question In: 0')).toBeInTheDocument();
    });
  });
});
 
