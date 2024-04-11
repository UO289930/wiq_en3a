import React from "react";
import { Button } from "../ui/button";
import { Question, useGameQuestions, usePlayingState } from "../../stores/playing-store";

type props = {
  score: number,
  questions: Question[];
};

const GameOver = (props: props) => {
  const handleHome = () => {
    usePlayingState.getState().stopPlaying();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-text gap-16">
      <h1 className="text-6xl font-bold ">Game Over</h1>
      <div>
        <div>
          <a href={props.questions[0].wikiLink}>info</a>
          {props.questions[0].text + ' : ' + props.questions[0].answers[props.questions[0].correctAnswer]}
        </div>
        <p className="text-2xl">Score: {props.score}</p>
      </div>
      <div className="flex">
      <Button onClick={() => handleHome()} className="text-xl" variant={"ghost"}>HOME</Button>
      </div>
    </div>
  );
};

export default GameOver;
