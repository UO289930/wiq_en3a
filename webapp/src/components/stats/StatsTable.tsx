import React from "react";
 
export default function StatsTable() {
    // Function to generate a random integer within a range
    const getRandomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Fake getUsername function
    const getUsername = (): string => {
        return "name 1";
    }

    // Fake data generation
    const correctAnswers: number = getRandomInt(0, 100);
    const wrongAnswers: number = getRandomInt(0, 100);
    const totalQuestions: number = correctAnswers + wrongAnswers;
    const percentageCorrect: number = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <table className="stats-table">
            <thead>
                <tr className="header">
                    <th className="statistics">Statistics</th>
                    <th className="value">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr className="body-row">
                    <td className="row-header">Username</td>
                    <td className="row-value">{getUsername()}</td>
                </tr>

                <tr className="body-row"> 
                    <td className="row-header">Correct Answers</td>
                    <td>{correctAnswers}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header">Wrong Answers</td>
                    <td>{wrongAnswers}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header">Percentage Correct</td>
                    <td>{percentageCorrect}%</td>
                </tr>
            </tbody>
        </table>

    );
}
