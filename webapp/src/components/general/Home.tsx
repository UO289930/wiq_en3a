import React from "react";
import { Link } from "react-router-dom";



export const Home = () => {

    const [selectedOption, setSelectedOption] = React.useState('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
    }

    
  

    return (<div className="flex flex-col h-full gap-2 justify-start border-red-300">
        
        <div>
            <h1 className="text-text font-bold text-4xl text-center mt-16">Are you smarter than a penguin? 🐧</h1>
        </div>
        <div className="flex flex-col gap-10 justify-start items-center p-20"> 
            <Link id="normalGame" className={" text-text border w-64 text-center border-text hover:bg-background2 p-5 rounded-xl font-bold text-3xl"} to={`/game${selectedOption}`}>Normal Game </Link>
            <Link id="triviaGame" className={" text-text border w-64 text-center border-text hover:bg-background2 p-5 rounded-xl font-bold text-3xl"} to={`/trivia${selectedOption}`}>Trivia Game</Link>
        </div>

        <div className="flex gap-12 self-center text-2xl">
            <label className="inline-flex items-center text-text font-bold justify-center">
                <input
                type="radio"
                value=""
                checked={selectedOption === ''}
                onChange={handleOptionChange}
                />
                <span className="ml-2">Easy</span>
            </label>

            <label className="inline-flex items-center text-text font-bold justify-center">
                <input
                type="radio"
                value="/hard"
                checked={selectedOption === '/hard'}
                onChange={handleOptionChange}
                />
                <span className="ml-2">Hard</span>
            </label>
        </div>

        </div>
    );
    }