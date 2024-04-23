import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cheese } from './Cheese';

describe('Cheese', () => {
  it('renders the correct cheese colors based on props', () => {
    render(<Cheese showBlue={true} showGreen={true} showYellow={true} showPink={true} showOrange={true} />);

    expect(screen.getByTestId('quesito-azul')).toBeInTheDocument();
    expect(screen.getByTestId('quesito-verde')).toBeInTheDocument();
    expect(screen.getByTestId('quesito-amarillo')).toBeInTheDocument();
    expect(screen.getByTestId('quesito-rosa')).toBeInTheDocument();
    expect(screen.getByTestId('quesito-naranja')).toBeInTheDocument();
  });

  it('does not render cheese colors when props are false', () => {
    render(<Cheese showBlue={false} showGreen={false} showYellow={false} showPink={false} showOrange={false} />);

    expect(screen.queryByTestId('quesito-azul')).not.toBeInTheDocument();
    expect(screen.queryByTestId('quesito-verde')).not.toBeInTheDocument();
    expect(screen.queryByTestId('quesito-amarillo')).not.toBeInTheDocument();
    expect(screen.queryByTestId('quesito-rosa')).not.toBeInTheDocument();
    expect(screen.queryByTestId('quesito-naranja')).not.toBeInTheDocument();
  });
});