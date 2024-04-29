import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth-service";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useUserStore } from '../../stores/user-store';

export default function StatsTable() {
    const [questionsAnswered ,setQuestionAnswered ] = useState<number>(0);
    const [questionsCorrect, setQuestionCorrect] = useState<number>(0);
    const [chesses, setChesses] = useState<number>(0);

    useEffect(() => {
        getUserFromSession();
    } , []);

    const getUserFromSession = () => {
        let user = useUserStore.getState().user;
        if(user != null){
            getUser(user.username).then((u) => {
                setQuestionAnswered(u.questions_answered);
                setQuestionCorrect(u.correctly_answered_questions + u.cheeseCount);
                setChesses(u.cheeseCount);
            }).catch((error) => {
                console.error('Error during retrieving the user', error);
            });
        }   
    };
    
    return (
        <div className="container mt-6"> 
                <div className="image-container">
                    <img src="/penguinsLeft.webp" alt="Left" />
                </div>            
                <table className="stats-table text-text text-4xl " data-testid="stats-table">
                <thead>
                    <tr className="header">
                        <th className="statistics" style={{ padding: '5px' , fontSize:'1.5em' }}>Statistics</th>
                        <th className="value" style={{ padding: '5px', fontSize:'1.5em'}}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="body-row"> 
                        <td className="row-header" style={{ padding: '5px' }}>Correct Answers</td>
                        <td data-testid="correct-answers" style={{ padding: '5px' }}>{questionsCorrect}</td>
                    </tr>
                    <tr className="body-row">
                        <td className="row-header" style={{ padding: '5px' }}>Wrong Answers</td>
                        <td data-testid="wrong-answers" style={{ padding: '5px' }}>{questionsAnswered - questionsCorrect}</td>
                    </tr>
                    <tr className="body-row">
                        <td className="row-header" style={{ padding: '5px' }}>Gained chesses</td>
                        <td data-testid="chesses-gained" style={{ padding: '5px' }}>{chesses}</td>
                    </tr>
                    <tr className="body-row">
                        <td className="row-header" style={{ padding: '5px' }}>Percentage Correct</td>
                        <td style={{ padding: '5px' }}>
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
            <div className="image-container">
                <img src="/penguinsRight.webp" alt="Right" />
            </div>
          </div>
    );
}