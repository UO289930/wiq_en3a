import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Counter from './Counter';

const mockSetCount = jest.fn();

describe('Counter component', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Usar timers falsos
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); // Restaurar timers reales
  });

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

  test('calls setCount every 100ms', () => {
    const props = {
      answered: false,
      setAnswered: jest.fn(),
      duration: 1000, // Duración del contador (en milisegundos)
      count: 5,
      setCount: mockSetCount,
      initialCount: 5,
    };

    render(<Counter {...props} />);

    // Avanzar 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockSetCount).toHaveBeenCalledTimes(1);

    // Avanzar 100ms adicionales
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockSetCount).toHaveBeenCalledTimes(2);

  });

  test('stops the timer when answered', () => {
    const props = {
      answered: true,
      setAnswered: jest.fn(),
      duration: 1000,
      count: 5,
      setCount: mockSetCount,
      initialCount: 5,
    };

    render(<Counter {...props} />);

    // Avanzar 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Asegurarse de que el contador no se haya decrementado
    expect(mockSetCount).not.toHaveBeenCalled();
  });

});