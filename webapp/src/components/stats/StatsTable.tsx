import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth-service";
import { useUserStore } from '../../stores/user-store';

export default function StatsTable() {
    

    const [questionsAnswered ,setQuestionAnswered ] = useState<number>(0);
    const [questionsCorrect, setQuestionCorrect] = useState<number>(0);
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        let user = useUserStore.getState().user;

        if(user != null){
            setQuestionAnswered(user.questions_answered);
            setQuestionCorrect(user.correctly_answered_questions);
            setUsername(user.username);
        }
    } , []);
    

    // Data generation
    const percentageCorrect: number = questionsAnswered === 0 ? 0 : Math.round((questionsCorrect / questionsAnswered) * 100);

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
                    <td className="row-value">{username}</td>
                </tr>

                <tr className="body-row"> 
                    <td className="row-header">Correct Answers</td>
                    <td>{questionsCorrect}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header">Wrong Answers</td>
                    <td>{questionsAnswered - questionsCorrect}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header">Percentage Correct</td>
                    <td>{percentageCorrect}%</td>
                </tr>
            </tbody>
        </table>

    );
}