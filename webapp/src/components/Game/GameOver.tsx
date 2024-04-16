import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type props = {
  score: number;
};

const GameOver = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen text-text gap-16">
      <h1 className="text-6xl font-bold ">Game Over</h1>
      <div>
        <p className="text-2xl">Score:</p>
      </div>
      <div className="flex">
      <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/home`}>Home</Link>
      </div>
    </div>
  );
};

export default GameOver;
