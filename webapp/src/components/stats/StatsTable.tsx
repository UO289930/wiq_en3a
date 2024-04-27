import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth-service";
import { useUserStore } from '../../stores/user-store';

export default function StatsTable() {
    const [questionsAnswered ,setQuestionAnswered ] = useState<number>(0);
    const [questionsCorrect, setQuestionCorrect] = useState<number>(0);
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        getUserFromSession();
    } , []);

    const getUserFromSession = () => {
        let user = useUserStore.getState().user;
        if(user != null){
            getUser(user.username).then((u) => {
                setQuestionAnswered(u.questions_answered);
                setQuestionCorrect(u.correctly_answered_questions + u.cheeseCount);
                setUsername(u.username);
            }).catch((error) => {
                console.error('Error during retrieving the user', error);
            });
        }   
    };
    

    // Data generation
    const percentageCorrect: number = questionsAnswered === 0 ? 0 : Math.round((questionsCorrect / questionsAnswered) * 100);

    return (
        <table className="stats-table text-text text-4xl" data-testid="stats-table">
            <thead>
                <tr className="header">
                    <th className="statistics">Statistics</th>
                    <th className="value">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr className="body-row">
                    <td className="row-header">Username</td>
                    <td className="row-value" data-testid="username">{username}</td>
                </tr>

                <tr className="body-row"> 
                    <td className="row-header">Correct Answers</td>
                    <td data-testid="correct-answers">{questionsCorrect}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header">Wrong Answers</td>
                    <td data-testid="wrong-answers">{questionsAnswered - questionsCorrect}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header">Percentage Correct</td>
                    <td data-testid="percentage-correct">{percentageCorrect}%</td>
                </tr>
            </tbody>
        </table>

    );
}