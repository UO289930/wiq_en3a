import React from "react";

type props = {
    score : number;
    };

const GameOver = (props : props) =>{
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-purple-400 ">
      <h1 className="text-6xl font-bold text-purple-950 h-1/4">Game Over</h1>
      <div>
        <p className="text-black text-3xl">Score: {props.score}</p>
      </div>
    </div>
    );
  }

export default GameOver; 