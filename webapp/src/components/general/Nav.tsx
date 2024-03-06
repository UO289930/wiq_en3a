import { handleShowDialog, usePlayingState } from "../../stores/playing-store";
import { logout } from "../../services/auth-service";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import React from "react";

export const Nav = () => {
  return (
    <div className="aspect-square h-12 px-5 py-3 flex items-center w-full justify-between border-b ">
      <Avatar className="w-9 h-9 rounded-full hover:cursor-pointer">
        <AvatarImage src="https://pbs.twimg.com/media/Frq7CQ-WwAEnXzh?format=jpg&name=large" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
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
