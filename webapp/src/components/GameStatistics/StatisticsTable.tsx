import React from 'react';

// Define the interface for game statistics
interface GameStatistics {
  total: number;
  correct: number;
  correctRate: string; // It could be a string representing a percentage like "50.00%"
  date: Date;
}

interface StatisticsTableProps {
  statistics: GameStatistics[];
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ statistics }) => {
  return (
    <div>
      <h2>Game Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Total</th>
            <th>Correct</th>
            <th>Correct Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((stat, index) => (
            <tr key={index}>
              <td>{stat.total}</td>
              <td>{stat.correct}</td>
              <td>{stat.correctRate}</td>
              <td>{stat.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StatisticsTable;
