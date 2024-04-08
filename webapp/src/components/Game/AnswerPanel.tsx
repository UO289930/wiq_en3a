import React from "react";
import Answer from "./Answer";

export type props = {
  answered: boolean;
  correctAnswer: number;
  answers: string[];
  score: number;
  setAnswered: (answered: boolean) => void;
  setScore: (score: number) => void;
  setCorrectSelected: (correctSelected: boolean) => void;
  handleNextQuestion: () => void;
};

const AnswerPanel = (props: props) => {

  return (
    <div id="respuestas" className="flex flex-wrap gap-10 justify-center flex-1 py-5  ">
      {props.answers.map((answer, index) => {
        return (
          <Answer
            key={index}
            score={props.score}
            setCorrectSelected={props.setCorrectSelected}
            setScore={props.setScore}
            answer={answer}
            correctAnswer={props.correctAnswer === index}
            answered={props.answered}
            setAnswered={props.setAnswered}
            handleNextQuestion={props.handleNextQuestion}
          />
        );
      })}
    </div>
  );
};

export default AnswerPanel;
