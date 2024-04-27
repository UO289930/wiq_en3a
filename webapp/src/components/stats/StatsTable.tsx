import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth-service";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useUserStore } from '../../stores/user-store';

export default function StatsTable() {
    const [questionsAnswered ,setQuestionAnswered ] = useState<number>(0);
    const [questionsCorrect, setQuestionCorrect] = useState<number>(0);
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        let user = useUserStore.getState().user;
        if(user != null){
            getUser(user.username).then((u) => {
                console.log('user: ',u);
                setQuestionAnswered(u.questions_answered);
                setQuestionCorrect(u.correctly_answered_questions + u.cheeseCount);
                setUsername(u.username);
            }).catch((error) => {
                console.error('Error during retrieving the user', error);
            });
        }   
    } , []);
    

    // Data generation
    const percentageCorrect: number = questionsAnswered === 0 ? 0 : Math.round((questionsCorrect / questionsAnswered) * 100);

    return (
        <table className="stats-table">
            <thead>
                <tr className="header">
                    <th className="statistics" style={{ padding: '10px' , fontSize:'1.5em' }}>Statistics</th>
                    <th className="value" style={{ padding: '10px', fontSize:'1.5em'}}>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr className="body-row"> 
                    <td className="row-header" style={{ padding: '10px' }}>Correct Answers</td>
                    <td style={{ padding: '10px' }}>{questionsCorrect}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header" style={{ padding: '10px' }}>Wrong Answers</td>
                    <td style={{ padding: '10px' }}>{questionsAnswered - questionsCorrect}</td>
                </tr>
                <tr className="body-row">
                    <td className="row-header" style={{ padding: '10px' }}>Percentage Correct</td>
                    <td style={{ padding: '10px' }}>
                        <CircularProgress 
                            value={ questionsAnswered > 0 ? (Math.round(((questionsCorrect / questionsAnswered) * 100) * 100) / 100) : 0} 
                            color='#00A078' thickness='.3rem'
                            size={"3rem"}>
                            <CircularProgressLabel >
                                {questionsAnswered > 0 ? (Math.round(((questionsCorrect / questionsAnswered) * 100) * 100) / 100).toFixed(0) : 0}%
                            </CircularProgressLabel>
                        </CircularProgress>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}