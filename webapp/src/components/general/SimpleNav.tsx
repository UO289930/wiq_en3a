import { handleShowDialog, usePlayingState, useStats } from "../../stores/playing-store";
import { logout, getQuestionsAnswered, getCorrectlyAnsweredQuestions } from "../../services/auth-service";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import React from "react";
import { useUserStore } from "../../stores/user-store";
import { Link } from "react-router-dom";

export const SimpleNav = () => {
  let username : string = useUserStore(state => state.user?.username!);

  const getLinkStyle = ():string => {
    return "text-text text-sm font-bold hover:text-primary transition-colors duration-300 ease-in-out"
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
      
      </div>
      </div>
      <div className="flex gap-5">
        <Link className={getLinkStyle()} to={`/`}>Home</Link>
        <Link className={getLinkStyle()} to={`/statistics`}>Statistics</Link>
        <Link className={getLinkStyle()} to={`/logout`}>Logout</Link>
      </div>
    </div>

  );
};
