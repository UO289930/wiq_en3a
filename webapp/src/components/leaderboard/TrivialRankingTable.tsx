import React, { useEffect, useState } from "react";
import { GiPodiumSecond, GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import * as Avatar from '@radix-ui/react-avatar';
import { getAllUsers } from "../../services/auth-service";

export interface User {
    username: string,
    correctAnswers: number,
    totalAnswers: number,
    cheeseCount: number
}


export default function TrivialRankingTable() {

 
    const [users, setUsers] = useState<User[]>([])
    const podium = [<GiPodiumWinner size={"2.5rem"}/>,<GiPodiumSecond size={"2.5rem"} /> , <GiPodiumThird size={"2.5rem"} />]
    

        
    const getAllUsers2 = async () => {
        const response = await getAllUsers();
        return response;
    }
        

    useEffect(() => {
        getAllUsers2().then((users) => {
            const usersArray: User[] = Object.values(users).map((user: any) => ({
                username: user.username,
                correctAnswers: user.correctly_answered_questions,
                totalAnswers: user.questions_answered,
                cheeseCount: user.cheeseCount
            }));

            const filteredUsers = filterUsers(usersArray)

            setUsers(filteredUsers.sort((a, b) => b.cheeseCount - a.cheeseCount));
        
        }).catch((error) => {
            console.error('Error during retrieving all the users', error);
        });
    }, [])

    const filterUsers = (usersArray: User[]) => {
        return usersArray.filter(user => user.cheeseCount > 0);
    }
    

    return (
        <table className="ranking-table-trivial">
            <thead >
                <tr className="header">
                    <th className="avatar"></th>
                    <th className="ranking">RANKING</th>
                    <th className="cheeseCount">CHEESES</th>
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
                                <td className="cheeseCount">{user.cheeseCount}</td>
                                
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}