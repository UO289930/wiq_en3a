import React, { ReactNode, useEffect, useState } from "react";
import { GiPodiumSecond, GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import * as Avatar from '@radix-ui/react-avatar';
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { getAllUsers } from "../../services/auth-service";

export interface User {
    username: string,
    correctAnswers: number,
    totalAnswers: number
}


export default function RankingTable() {

 
    const [users, setUsers] = useState<User[]>([])
    const [podium, setPodium] = useState<ReactNode[]>
        ([<GiPodiumWinner size={"2.5rem"}/>,<GiPodiumSecond size={"2.5rem"} /> , <GiPodiumThird size={"2.5rem"} />])
    

        
    const getAllUsers2 = async () => {
        const response = await getAllUsers();
        return response;
    }
        

    useEffect(() => {
        getAllUsers2().then((users) => {
            const usersArray: User[] = Object.values(users).map((user: any) => ({
                username: user.username,
                correctAnswers: user.correctly_answered_questions,
                totalAnswers: user.questions_answered
            }));
            setUsers(usersArray.sort((a, b) => b.correctAnswers - a.correctAnswers));
        }).catch((error) => {
            console.error('Error during retrieving all the users', error);
        });
    }, [])

    
    

    return (
        <table className="ranking-table">
            <thead >
                <tr className="header">
                    <th className="avatar"></th>
                    <th className="ranking">RANKING</th>
                    <th className="correct-answers">CORRECT ANSWERS</th>
                    <th className="progress">% CORRECT ANSWERS</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr className="body-row">
                                <td className="avatar">
                                <Avatar.Root className="AvatarRoot">
                                <Avatar.Fallback className="AvatarFallback">{user.username.toUpperCase().charAt(0)}{user.username.toUpperCase().charAt(1)}</Avatar.Fallback>
                                </Avatar.Root>
                                {user.username.toLowerCase()}
                                </td>
                                <td className="ranking">
                                    {index === 0 || index === 1 || index === 2 ? podium[index] : index + 1}
                                </td>
                                <td className="correct-answers">{user.correctAnswers}</td>
                                <td className="progress">
                                    <CircularProgress 
                                        value={ user.totalAnswers > 0 ? (Math.round(((user.correctAnswers / user.totalAnswers) * 100) * 100) / 100) : 0} 
                                        color='#00A078' thickness='.4rem'
                                        size={"3.6rem"}>
                                        <CircularProgressLabel>{user.totalAnswers > 0 ? (Math.round(((user.correctAnswers / user.totalAnswers) * 100) * 100) / 100).toFixed(0) : 0}%</CircularProgressLabel>
                                    </CircularProgress>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}