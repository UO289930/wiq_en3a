import React from "react";
import { Button } from "../ui/button";
import { useGameQuestions, usePlayingState } from "../../stores/playing-store";

type props = {
  score: number;
};

const GameOver = (props: props) => {
  const handleHome = () => {
    usePlayingState.getState().stopPlaying();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-text gap-16">
      <h1 className="text-6xl font-bold ">Game Over</h1>
      <div>
        <p className="text-2xl">Score: {props.score}</p>
      </div>
      <div className="flex">
      <Button onClick={() => handleHome()} className="text-xl" variant={"ghost"}>HOME</Button>
      <Button onClick={() => {usePlayingState.getState().stopPlaying()}} className="text-xl" variant={"ghost"}>RESTART</Button>
      </div>
    </div>
  );
};

export default GameOver;
