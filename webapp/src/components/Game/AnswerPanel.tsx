import React from "react";
import Answer from "./Answer";

export type props = {
  answered: boolean;
  correctAnswer: number;
  answers: string[];
  score: number | undefined;
  setAnswered: (answered: boolean) => void;
  setScore: (score: number) => void | undefined;
  setCorrectSelected: (correctSelected: boolean) => void;
};

const AnswerPanel = (props: props) => {

  function formatNumberWithDots(str : string) : string {
    
    if (str.length < 4) {
      return str;
    }
    let result = '';
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
      result = str[i] + result;
      if (count % 3 === 2 && i !== 0) {
        result = '.' + result;
      }
    }
  
    return result;
  }
  
  function isNumber(str : string) : boolean {
    return !isNaN(Number(str));
  }
  

  return (
    <div id="respuestas" className="flex flex-wrap gap-10 justify-center flex-1 py-5  ">
      {props.answers.map((answer, index) => {
        const formattedAnswer = isNumber(answer) ? formatNumberWithDots(answer) : answer;
        return (
          <Answer
            key={index}
            score={props.score}
            setCorrectSelected={props.setCorrectSelected}
            setScore={props.setScore}
            answer={formattedAnswer}
            correctAnswer={props.correctAnswer === index}
            answered={props.answered}
            setAnswered={props.setAnswered}
          />
        );
      })}
    </div>
  );
};

export default AnswerPanel;
