import React from 'react';
import { render, screen } from '@testing-library/react';
import Info from './Info';

test('renders Info component', () => {
  render(<Info />);
  
  // Check if the header is present
  const headerElement = screen.getByText(/INFORMATION/i);
  expect(headerElement).toBeInTheDocument();

  // Check if the image is present
  const imageElement = screen.getByAltText(/Descripción de la imagen/i);
  expect(imageElement).toBeInTheDocument();

  // Check if the rules are present
  const rulesElement = screen.getByText(/Rules:/i);
  expect(rulesElement).toBeInTheDocument();

  // Check if the game modes are present
  const normalGameElement = screen.getByText(/Normal Game:/i);
  expect(normalGameElement).toBeInTheDocument();

  const triviaGameElement = screen.getByText(/Trivia game:/i);
  expect(triviaGameElement).toBeInTheDocument();

  // Check if the links are present
  const linksElement = screen.getByText(/Links:/i);
  expect(linksElement).toBeInTheDocument();

  // Check if the GitHub link is present
  const githubLinkElement = screen.getByText(/GitHub/i);
  expect(githubLinkElement).toBeInTheDocument();
  expect(githubLinkElement).toHaveAttribute('href', 'https://github.com/Arquisoft/wiq_en3a');

  // Check if the Documentation link is present
  const documentationLinkElement = screen.getByText(/Documentation/i);
  expect(documentationLinkElement).toBeInTheDocument();
  expect(documentationLinkElement).toHaveAttribute('href', 'https://arquisoft.github.io/wiq_en3a/');

  // Check if the OpenAPI link is present
  const openApiLinkElement = screen.getByText(/OpenAPI/i);
  expect(openApiLinkElement).toBeInTheDocument();
  expect(openApiLinkElement).toHaveAttribute('href', 'http://51.103.210.249:8000/api-doc/');
});