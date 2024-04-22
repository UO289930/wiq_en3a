import React from "react";
import { Link } from "react-router-dom";



export const Home = () => {
  
    return (<div className="flex flex-col h-full border-red-300">
        <div className="flex flex-col gap-10 h-full justify-center items-center"> 
            <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/game`}>Normal Game</Link>
            <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/trivia`}>Trivia Game</Link>
        </div>
    

        </div>
    );
    }