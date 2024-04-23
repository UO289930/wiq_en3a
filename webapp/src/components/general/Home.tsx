import React from "react";
import { Link } from "react-router-dom";



export const Home = () => {
  
    return (<div className="flex flex-col h-full border-red-300">
        <div className="flex flex-col gap-10 h-full justify-start items-center p-20"> 
            <Link id="normalGame" className={" text-text border w-64 text-center border-text hover:bg-background2 p-5 rounded-xl font-bold text-3xl"} to={`/game`}>Normal Game </Link>
            <Link id="triviaGame" className={" text-text border w-64 text-center border-text hover:bg-background2 p-5 rounded-xl font-bold text-3xl"} to={`/trivia`}>Trivia Game</Link>
        </div>
    

        </div>
    );
    }