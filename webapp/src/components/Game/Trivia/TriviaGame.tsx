import React, { useEffect } from "react";
import { Cheese } from "./Cheese";
import { useState } from "react";
import { Dice } from "./Dice";
import { Button } from "../../ui/button";
import { getCategoryColorWithNumber, getCategoryWithNumber } from "./categories";
import { Question as questionType } from "@/src/stores/playing-store";
import { getArtQuestion, getGeographyQuestion, getHistoryQuestion, getScienceQuestion, getSportQuestion } from "./fakeQuestions";
import Question from "../Question";

export const TriviaGame = () => {
  const [showBlue, setShowBlue] = useState(true);
  const [showGreen, setShowGreen] = useState(true);
  const [showYellow, setShowYellowCheese] = useState(true);
  const [showPink, setShowPinkCheese] = useState(true);
  const [showOrange, setShowOrange] = useState(true);

  const [diceResult, setDiceResult] = useState(0);
  const [playingMode, setPlayingMode] = useState(false);

 
  
  const handleClick = () => {
    
  }

  const textStyle = {
    color: getCategoryColorWithNumber(diceResult),
  };

  const getQuestion = (category : string) : questionType => {
    switch (category) {
      case "Sport":
        return getSportQuestion();
      case "Science":
        return getScienceQuestion();
      case "History":
        return getHistoryQuestion();
      case "Geography":
        return getGeographyQuestion();
      case "Art":
        return getArtQuestion();
      default:
        return getSportQuestion();

    }
  };
  




  const getCategory = (diceResult: number) => {
    return getCategoryWithNumber(diceResult);
  };

  return (
    <div className="p-5 gap-8 flex justify-start items-start flex-col h-full w-ful">
      <div className="flex justify-start gap-4 items-center">
        <Cheese
          showBlue={showBlue}
          showGreen={showGreen}
          showYellow={showYellow}
          showPink={showPink}
          showOrange={showOrange}
        />
      </div>
      {!playingMode ? 
      <div>
      <Dice setDiceResult={setDiceResult} handleClick={handleClick} />

      <h1 className="text-text text-2xl">
        Category: {getCategory(diceResult)}
      </h1>
      </div>
      :
      <div className="flex flex-col justify-center items-center w-full">
        
        <Question questionText={getQuestion(getCategory(diceResult)).text}></Question>
        <Button className="bg-primary text-text " onClick={() => {setPlayingMode(false)}}>Stop playing</Button>
          
         
      </div>
      }
      
    </div>
  );
};
