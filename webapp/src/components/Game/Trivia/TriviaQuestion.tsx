import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Question as questionType } from "@/src/stores/playing-store";
import Question from "../Question";
import AnswerPanel from "../AnswerPanel";

export type props = {
  questionShowed: questionType | null;
  setIsShowingQuestion: (isShowingQuestion: boolean) => void;
  setColor: (bool: boolean) => void;
  color: string;
};

export const TriviaQuestion = (props: props) => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  let [answered, setAnswered] = React.useState(false);

  useEffect(() => {
    if (answered) {
      sleep(2000).then(() => {
        props.setIsShowingQuestion(false);
      });
    }
  }, [answered]);

  const setCorrectSelected = (result: boolean) => {
    if (result) {
      props.setColor(true);
    } else {
      console.log("incorrect answer");
    }
  };

  const getQuestionText = (question: questionType | null) => {
    if (question === null) {
      return "No question available";
    } else {
      return question.text;
    }
  };

  return (
    <div
      style={{ borderColor: props.color }}
      className="flex flex-col justify-center items-center w-full border-2 rounded-lg p-8"
    >
      <Question questionText={getQuestionText(props.questionShowed)}></Question>
      <AnswerPanel
        answered={answered}
        score={undefined}
        setScore={() => {}}
        correctAnswer={props.questionShowed?.correctAnswer || 0}
        answers={props.questionShowed?.answers || []}
        setAnswered={setAnswered}
        setCorrectSelected={setCorrectSelected}
      ></AnswerPanel>
    </div>
  );
};
