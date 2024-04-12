import React, { useEffect, useState } from "react";


export interface User {
    name: string,
    correctAnswers: number,
    incorrectAnswers: number
}

const API_URL = 'http://localhost:8003';

export const retrieveAllUsers = () => {
    fetch(`${API_URL}/user/getAllUsers`)
    .then((response) => response.json())
    .then((data) => {
      console.log('response:', data);
      return data;
    })
    .catch((error) => {
      console.error('There was a problem with the users:', error);
      return []
    });
};

export default function RankingTable() {

    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        const result = retrieveAllUsers();
        console.log(result)
    }, [])






    return (
        <table className="ranking-table">
            <thead >
                <tr className="header">
                    <th className="avatar"></th>
                    <th className="ranking">Ranking</th>
                    <th className="correct-answers">Correct answers</th>
                    <th className="progress">Progress</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    )
}