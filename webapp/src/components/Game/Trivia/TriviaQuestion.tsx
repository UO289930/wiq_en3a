import React, { useEffect } from 'react'
import { Button } from "../../ui/button"
import { Question as questionType } from "@/src/stores/playing-store";
import Question from "../Question"
import AnswerPanel from '../AnswerPanel';

export type props = {
    questionShowed: questionType | null
    setIsShowingQuestion: (isShowingQuestion: boolean) => void
    setColor: (bool : boolean) => void

} 

export const TriviaQuestion = (props : props) => {

    const sleep = (ms : number) => new Promise(r => setTimeout(r, ms))

    let [answered, setAnswered] = React.useState(false);

    useEffect(() => {
        if (answered) {
          sleep(2000).then(() => {
            props.setColor(true);
            props.setIsShowingQuestion(false);
          })}
      }, [answered]);

    const setCorrectSelected = (result : boolean) => {

        if(result){
            console.log('correct answer')
        }
        else {
            console.log('incorrect answer')
        }

    }




    const getQuestionText = (question: questionType | null) => {
        if (question === null) {
          return "No question available";
        } else {
          return question.text;
        }
      }

    return (
        <div className="flex flex-col justify-center items-center w-full">
        
        <Question questionText={getQuestionText(props.questionShowed)}></Question>
        <AnswerPanel
        answered={answered}
        score ={undefined}
        setScore={() => {}}
        correctAnswer={props.questionShowed?.correctAnswer || 0}
        answers={props.questionShowed?.answers || []}
        setAnswered={setAnswered}
        setCorrectSelected={setCorrectSelected}
        >
        </AnswerPanel>
          
         
      </div>
    )
}
