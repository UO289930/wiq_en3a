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
                        <th className="self-center text-4xl p-5" >Statistics</th>
                        <th className="self-center text-4xl p-5" >Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="body-row transition-transform duration-100 transform"> 
                        <td className="self-center text-2xl p-5">Correct Answers</td>
                        <td className="text-2xl p-5" data-testid="correct-answers">{questionsCorrect}</td>
                    </tr>
                    <tr className="body-row transition-transform duration-100 transform">
                        <td className="self-center text-2xl p-5 " >Wrong Answers</td>
                        <td className="text-2xl p-5 " data-testid="wrong-answers">{questionsAnswered - questionsCorrect}</td>
                    </tr>
                    <tr className="body-row transition-transform duration-100 transform">
                        <td className="self-center text-2xl p-5">Gained chesses</td>
                        <td className="text-2xl p-5" data-testid="chesses-gained">{chesses}</td>
                    </tr>
                    <tr className="body-row transition-transform duration-100 transform">
                        <td className="self-center text-2xl p-5 ">Percentage Correct</td>
                        <td style={{ padding: '5px' }}>
                            <CircularProgress 
                                value={ questionsAnswered > 0 ? (Math.round(((questionsCorrect / questionsAnswered) * 100) * 100) / 100) : 0} 
                                color='#00A078' thickness='.4rem'
                                size={"4rem"}>
                                <CircularProgressLabel fontSize={20}>
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