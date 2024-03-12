import { handleShowDialog, usePlayingState, useStats } from "../../stores/playing-store";
import { logout, getQuestionsAnswered, getCorrectlyAnsweredQuestions } from "../../services/auth-service";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import React from "react";
import { useUserStore } from "../../stores/user-store";

export const Nav = () => {
  let username : string = useUserStore(state => state.user?.username!);
  let questionAnswered : number = useStats(state => state.questionsAnswered);
  let correctlyAnswered : number = useStats(state => state.correctlyAnsweredQuestions);
  const getCorrectRate = () => {
    if(questionAnswered === 0) return 0;
    return (Math.round(((correctlyAnswered / questionAnswered) * 100) * 100) / 100).toFixed(2);
  }

  return (
    <div className="aspect-square h-12 px-5 py-3 flex items-center w-full justify-between border-b ">
      <div className="flex items-center gap-5 ">
      <Avatar className="w-9 h-9 rounded-full">
        <AvatarImage src="https://pbs.twimg.com/media/Frq7CQ-WwAEnXzh?format=jpg&name=large" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2 text-text text-sm font-thin ">
      <h2 className="font-bold">{username}</h2>
      <h2 className="font-normal">- Total Stats (</h2>
      <p>Total: {questionAnswered}</p>
      <p>Correct: {correctlyAnswered}</p>
      <p>Correct Rate: {getCorrectRate()}%</p>
      <h2 className="font-normal">)</h2>
      </div>
      </div>
      <div className="flex">
        <Button
          onClick={() =>
            handleShowDialog(() => usePlayingState.getState().stopPlaying())
          }
          variant="ghost"
        >
          Home
        </Button>
        <Button
          onClick={() =>
            handleShowDialog(() => {
              usePlayingState.getState().stopPlaying();
              logout();
            })
          }
          variant="ghost"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
