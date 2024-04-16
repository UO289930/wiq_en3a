import React, { useEffect } from "react";
import { Cheese } from "./Cheese";
import { useState } from "react";
import { Button } from "../../ui/button";
import { getCategoryColor, getCategoryColorWithNumber, getCategoryWithNumber } from "./categories";
import { Question as questionType } from "../../../services/question-service";
import { getEntertainmentQuestions, getGeographyQuestions, getHistoryQuestions, getScienceQuestions, getSportQuestions } from "./trivia_service";
import { TriviaQuestion } from "./TriviaQuestion";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export const TriviaGame = () => {
  const [showBlue, setShowBlue] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showYellow, setShowYellow] = useState(false);
  const [showPink, setShowPink] = useState(false);
  const [showOrange, setShowOrange] = useState(false);

  const [diceResult, setDiceResult] = useState(0);
  const [questionShowed, setQuestionShowed] = useState<questionType | null>(null);
  const [isShowingQuestion, setIsShowingQuestion] = useState(false);

 
  const sleep = (ms : number) => new Promise(r => setTimeout(r, ms))

  type SetColorFunction = (bool: boolean) => void; 

const getSetColor: (n: number) => SetColorFunction = (n: number) => {
  let category = getCategoryWithNumber(n);
  switch (category) {
    case "Sport":
      return setShowBlue; 
    case "Science":
      return setShowGreen;
    case "History":
      return setShowYellow;
    case "Geography":
      return setShowOrange;
    case "Entertainment":
      return setShowPink;
    default:
      return setShowBlue;

  }
  
 
};


  const generateDiceRandomNumber = () => {
    return Math.floor(Math.random() * 5) + 1;
  
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
    <div className="p-5 gap-8 flex justify-start items-start flex-col h-full w-full">
      <div className="flex w-full gap-4 justify-between mb-10">
        <Cheese
          showBlue={showBlue}
          showGreen={showGreen}
          showYellow={showYellow}
          showPink={showPink}
          showOrange={showOrange}
        />
        <Popover>
        <PopoverTrigger className="text-text">
          <Button className="bg-transparent border w-32 border-text">Show Categories</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <div className="bg-transparent  mt-4 mr-8 p-4">
            <h1 style={{color: getCategoryColor("Sports")}}> 1 - Sports</h1>
            <h1 style={{color: getCategoryColor("Science")}}> 2 - Science</h1>
            <h1 style={{color: getCategoryColor("History")}}>3 - History</h1>
            <h1 style={{color: getCategoryColor("Geography")}}>4 - Geography</h1>
            <h1 style={{color: getCategoryColor("Entertainment")}}>5 - Entertainment</h1>
          </div>
        </PopoverContent>
        </Popover>

      </div>
      {!isShowingQuestion ? 
      <div>
      <Button className="w-12" onClick={() => {
        let result = generateDiceRandomNumber();
        while(result === diceResult){
          result = generateDiceRandomNumber();
        }
        setDiceResult(result);
        
      }}>
        
        
      {diceResult === 0 ? "Roll dice" : diceResult}
      </Button>

      <h1 className="text-text text-2xl">
        Category: {getCategory(diceResult)}
      </h1>
      </div>
      :
      <TriviaQuestion color={getCategoryColorWithNumber(diceResult)} setColor={getSetColor(diceResult)}  questionShowed={questionShowed} setIsShowingQuestion={setIsShowingQuestion}></TriviaQuestion>
      }
      
      
      </div>
  );
};
