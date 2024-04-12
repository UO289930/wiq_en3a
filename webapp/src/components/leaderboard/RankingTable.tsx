import React, { useEffect, useState } from "react";


export interface User {
    username: string,
    correctAnswers: number,
    totalAnswers: number
}

// const API_URL = 'http://localhost:8003';

// export const retrieveAllUsers = () => {
//     fetch(`${API_URL}/user/getAllUsers`)
//     .then((response) => {console.log(response.json()); return response.json()})
//     .then((data) => {
//       console.log('response:', data);
//       return data;
//     })
//     .catch((error) => {
//       console.error('There was a problem with the users:', error);
//       return []
//     });
// };

export default function RankingTable() {

    const memoryusers:User[] = [
        {
            username: "Pepe",
            correctAnswers: 100,
            totalAnswers: 100,
        }, 
        {
            username: "Mani",
            correctAnswers: 30,
            totalAnswers: 100,
        }, 
        {
            username: "Loli",
            correctAnswers: 90,
            totalAnswers: 100,
        }, 
        {
            username: "Josu",
            correctAnswers: 12,
            totalAnswers: 100,
        }
    ]

    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        setUsers(memoryusers.sort((a, b) => b.correctAnswers - a.correctAnswers));
    }, [])

    return (
        <table className="ranking-table">
            <thead >
                <tr className="header">
                    <th className="avatar"></th>
                    <th className="ranking">RANKING</th>
                    <th className="correct-answers">CORRECT ANSWERS</th>
                    <th className="progress"></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr className="body-row">
                                <td className="avatar">{user.username}</td>
                                <td className="ranking">{index + 1}</td>
                                <td className="correct-answers">{user.correctAnswers}</td>
                                <td className="progress">{user.totalAnswers - (user.totalAnswers - user.correctAnswers)}%</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}