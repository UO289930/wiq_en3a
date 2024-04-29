import React from 'react';
import {expect, jest, test} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import { SimpleNav } from './SimpleNav';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter

jest.mock("../../stores/user-store", () => {
    return {
        getUsername: () => "testUser"
    }
});

it('renders without crashing', () => { 
    render(<Router> 
        <SimpleNav />
      </Router>);
});

describe('SimpleNav', () => {
  test('renders user information and navigation links', () => {

    const { getByText, getByTestId } = render(<Router> <SimpleNav /> </Router>);
    
    // Check if user information is displayed
    expect(getByText('testUser')).toBeInTheDocument(); 

    // Check if navigation links are displayed
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Leaderboard')).toBeInTheDocument();
    expect(getByText('Statistics')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();

    // Check if audio button is displayed
    expect(getByTestId('audio-button')).toBeInTheDocument();
  });

  test('renders audio button', () => {
    const { getByTestId } = render(
      <Router>
        <SimpleNav />
      </Router>
    );
  
    // Check if audio button is rendered
    expect(getByTestId('audio-button')).toBeInTheDocument();
  });

  test('toggle audio playback', () => {
    // Mock useRef hook
    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        play: jest.fn(),
        pause: jest.fn()
      }
    });
  
    // Render SimpleNav component
    const { getByTestId } = render(<Router> <SimpleNav /> </Router>);
  
    // Click on audio button
    fireEvent.click(getByTestId('audio-button'));
  
    // Click on audio button again
    fireEvent.click(getByTestId('audio-button'));
  });

  
  /*test('toggles audio playback when button is clicked', () => {
    const { getByTestId } = render(<Router> <SimpleNav /> </Router>);

    // Mock HTML audio element
    const playMock = jest.fn();
    const pauseMock = jest.fn();
    const audioMock = {
      current: {
        play: playMock,
        pause: pauseMock
      }
    };
    jest.spyOn(React, 'useRef').mockReturnValue(audioMock);

    // Click on audio button
    fireEvent.click(getByTestId('audio-button'));

    // Check if audio play function is called
    expect(playMock).toHaveBeenCalled();

    // Click on audio button again
    fireEvent.click(getByTestId('audio-button'));

    // Check if audio pause function is called
    expect(pauseMock).toHaveBeenCalled();
  });*/
}); 