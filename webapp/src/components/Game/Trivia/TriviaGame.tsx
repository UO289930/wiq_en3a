import React, { useEffect } from "react";
import { Cheese } from "./Cheese";
import { useState } from "react";
import { Dice } from "./Dice";
import { Button } from "../../ui/button";
import { getCategoryColorWithNumber, getCategoryWithNumber } from "./categories";
import { Question as questionType } from "@/src/stores/playing-store";
import Question from "../Question";
import { getEntertainmentQuestions, getGeographyQuestions, getHistoryQuestions, getScienceQuestions, getSportQuestions } from "./trivia_service";

export const TriviaGame = () => {
  const [showBlue, setShowBlue] = useState(true);
  const [showGreen, setShowGreen] = useState(true);
  const [showYellow, setShowYellowCheese] = useState(true);
  const [showPink, setShowPinkCheese] = useState(true);
  const [showOrange, setShowOrange] = useState(true);

  const [diceResult, setDiceResult] = useState(0);
  const [questionShowed, setQuestionShowed] = useState<questionType | null>(null);
  const [isShowingQuestion, setIsShowingQuestion] = useState(false);

 
  const sleep = (ms : number) => new Promise(r => setTimeout(r, ms))

  const generateDiceRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  
  }


  useEffect(() => {
    if(isShowingQuestion || diceResult === 0){
      return 
    }

    else {
      sleep(1000).then(() => {
        getQuestion(getCategory(diceResult)).then((question) => {
          setQuestionShowed(question);
          setIsShowingQuestion(true);
        });
      });
    }
  }, [diceResult]);

  const getQuestionText = (question: questionType | null) => {
    if (question === null) {
      return "No question available";
    } else {
      return question.text;
    }
  }


  const textStyle = {
    color: getCategoryColorWithNumber(diceResult),
  };

  const getQuestion = async (category: string): Promise<questionType> => {
    try {
      let question: questionType;
      switch (category) {
        case "Sport":
          question = await getSportQuestions();
          break;
        case "Science":
          question = await getScienceQuestions();
          break;
        case "History":
          question = await getHistoryQuestions();
          break;
        case "Geography":
          question = await getGeographyQuestions();
          break;
        case "Entertainment":
          question = await getEntertainmentQuestions();
          break;
        default:
          question = await getSportQuestions();
      }
      return question;
    } catch (error) {
      console.error("Error getting question:", error);
      throw error;
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
      {!isShowingQuestion ? 
      <div>
      <Button className="w-12" onClick={() => {
        setDiceResult(generateDiceRandomNumber());
      }}>
        {// <Dice setDiceResult={setDiceResult}/>
        }
      {diceResult === 0 ? "Roll dice" : diceResult}
      </Button>

      <h1 className="text-text text-2xl">
        Category: {getCategory(diceResult)}
      </h1>
      </div>
      :
      <div className="flex flex-col justify-center items-center w-full">
        
        <Question questionText={getQuestionText(questionShowed)}></Question>
        <Button className="bg-primary text-text " onClick={() => {setIsShowingQuestion(false)}}>Stop playing</Button>
          
         
      </div>
      }
      
    </div>
  );
};
