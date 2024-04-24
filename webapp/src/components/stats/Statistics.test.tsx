import React from 'react';
import { render, screen } from '@testing-library/react';
import Statistics from './Statistics';

jest.mock('./StatsTable', () => () => <div>Mock StatsTable</div>);

describe('Statistics component', () => {
  it('renders without crashing', () => {
    render(<Statistics />);
    expect(screen.getByText('Statistics page')).toBeInTheDocument();
  });

  it('renders the StatsTable component', () => {
    render(<Statistics />);
    expect(screen.getByText('Mock StatsTable')).toBeInTheDocument();
  });
});