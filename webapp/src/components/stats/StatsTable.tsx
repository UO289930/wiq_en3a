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
        <table>
            <thead>
                <tr>
                    <th>Statistics</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Username</td>
                    <td>{getUsername()}</td>
                </tr>
                <tr>
                    <td>Correct Answers</td>
                    <td>{correctAnswers}</td>
                </tr>
                <tr>
                    <td>Wrong Answers</td>
                    <td>{wrongAnswers}</td>
                </tr>
                <tr>
                    <td>Percentage Correct</td>
                    <td>{percentageCorrect}%</td>
                </tr>
            </tbody>
        </table>
    );
}
