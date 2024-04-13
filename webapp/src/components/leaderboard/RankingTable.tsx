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

// const API_URL = 'http://localhost:8003';

const API_URL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

/*
export const retrieveAllUsers = () => {
    fetch(`${API_URL}/getAllUsers`)
    .then((response) => {console.log(response.json()); return response.json()})
    .then((data) => {
      console.log('response:', data);
      return data;
    })
    .catch((error) => {
     console.error('There was a problem with the users (fetch):', error);
      return []
    });
};
*/


 
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
    const [podium, setPodium] = useState<ReactNode[]>
        ([<GiPodiumWinner size={"2.5rem"}/>,<GiPodiumSecond size={"2.5rem"} /> , <GiPodiumThird size={"2.5rem"} />])

    /*
    const getAllUserss = async () => {
        console.log('hola');
        const response = await getAllUsers();
        console.log(response);
        console.log('adios');
        
    }*/

    useEffect(() => {
        setUsers(memoryusers.sort((a, b) => b.correctAnswers - a.correctAnswers));


        const json = getAllUsers();
        console.log(json);
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
                                        value={user.totalAnswers - (user.totalAnswers - user.correctAnswers)} 
                                        color='#00A078' thickness='.4rem'
                                        size={"3.6rem"}>
                                        <CircularProgressLabel>{user.totalAnswers - (user.totalAnswers - user.correctAnswers)}%</CircularProgressLabel>
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