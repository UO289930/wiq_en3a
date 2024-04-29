import React from 'react';
import { render, screen,fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeaderBoard from './LeaderBoard';
import { getAllUsers } from "../../services/auth-service";
import { act } from 'react-dom/test-utils'; // Importa act

jest.mock('../../services/auth-service');

describe('Leaderboard', () => {
  beforeEach(() => {
    // Mock de los datos de usuarios
    (getAllUsers as jest.Mock).mockResolvedValue({
      user1: { username: 'user1', correctly_answered_questions: 5, questions_answered: 10 },
      user2: { username: 'user2', correctly_answered_questions: 3, questions_answered: 10 },
      user3: { username: 'user3', correctly_answered_questions: 7, questions_answered: 10 },
    });
  });

  it('renders leaderboard with normal table by default', async () => {
    await act(async () => { // Envuelve render en act
      render(<LeaderBoard />);
    });
      
    // Verifica que inicialmente se muestre la tabla normal
    const normalTable = screen.getByText('% CORRECT ANSWERS');
    expect(normalTable).toBeInTheDocument();
  });

  it('switches to trivial table when trivial tab is clicked', async () => {
    await act(async () => { // Envuelve render en act
      render(<LeaderBoard />);
    });
      
    // Haz clic en la pestaña Trivial
    const trivialTab = screen.getByRole('tab', { name: /trivial/i });
    userEvent.click(trivialTab);
    
    // Verifica que se muestre la tabla trivial después de hacer clic en la pestaña
    const trivialTable = screen.getByText("CHEESES");
    expect(trivialTable).toBeInTheDocument();
  });

  it('applies correct class to tabs when clicked', () => {
    render(<LeaderBoard />);
    
    // Verifica que la clase inicialmente seleccionada sea "chakra-tabs-tab-selected"
    const selectedTab = screen.getByRole('tab', { name: /NORMAL/i });
    expect(selectedTab).toHaveClass('chakra-tabs-tab-selected');

    // Verifica que la clase inicial no seleccionada sea "chakra-tabs-tab"
    const unselectedTab = screen.getByRole('tab', { name: /TRIVIAL/i });
    expect(unselectedTab).toHaveClass('chakra-tabs-tab');

    // Haz clic en la pestaña Trivial
    fireEvent.click(unselectedTab);

    // Verifica que la clase seleccionada cambió a "chakra-tabs-tab-selected" después de hacer clic
    expect(unselectedTab).toHaveClass('chakra-tabs-tab-selected');

    // Verifica que la clase no seleccionada cambió a "chakra-tabs-tab" después de hacer clic
    expect(selectedTab).toHaveClass('chakra-tabs-tab');
  });
});
