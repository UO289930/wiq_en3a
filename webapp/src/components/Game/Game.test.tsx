import { render, screen } from '@testing-library/react';
import React from 'react';
import Game from './Game';


test('always true test', () => {
    render(<Game />);
    expect(true).toBe(true);
});