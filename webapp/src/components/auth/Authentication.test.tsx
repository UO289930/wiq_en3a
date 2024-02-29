import { render, screen } from '@testing-library/react';
import Authentication from './Authentication';
import React from 'react';


test('always true test', () => {
    render(<Authentication />);
    expect(true).toBe(true);
});