import React from 'react';
import StatisticsTable from './StatisticsTable';

// Define the GameStatistics interface
interface GameStatistics {
  total: number;
  correct: number;
  correctRate: string;
  date: Date;
}

interface GameStatisticsPageProps {
  // Add any props you may need here
}

const GameStatisticsPage: React.FC<GameStatisticsPageProps> = ({}) => {
  // Explicitly specify the type of userGameStatistics
  const userGameStatistics: GameStatistics[] = []; // Example: Fetch or receive user game statistics

  return (
    <div>
      <h1>User Game Statistics</h1>
      <StatisticsTable statistics={userGameStatistics} />
    </div>
  );
};

export default GameStatisticsPage;
