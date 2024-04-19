import React, { ReactEventHandler } from "react";
import { Link } from "react-router-dom";



export const Home = () => {

    const [selectedOption, setSelectedOption] = React.useState('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
    }
  
    return (<div className="flex flex-col h-full border-red-300">
        <div className="flex gap-12 h-full self-center mt-4">
            <label className="inline-flex items-center text-text bg-primary rounded w-48 h-24 text-lg font-bold justify-center">
                <input
                type="radio"
                value=""
                checked={selectedOption === ''}
                onChange={handleOptionChange}
                />
                <span className="ml-2">Easy</span>
            </label>

            <label className="inline-flex items-center text-text bg-primary rounded w-48 h-24 text-lg font-bold justify-center">
                <input
                type="radio"
                value="/hard"
                checked={selectedOption === '/hard'}
                onChange={handleOptionChange}
                />
                <span className="ml-2">Hard</span>
            </label>
        </div>
        <div className="flex flex-col gap-10 h-full justify-center items-center"> 
            <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/game${selectedOption}`}>Normal Game</Link>
            <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/trivia${selectedOption}`}>Trivia Game</Link>
        </div>
    

        </div>
    );
    }