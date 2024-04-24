import React, { useEffect } from "react";
import { Cheese } from "./Cheese";
import { useState } from "react";
import { Button } from "../../ui/button";
import { getCategoryColor, getCategoryColorWithNumber, getCategoryWithNumber } from "./categories";
import { getHardString, Question as questionType } from "../../../services/question-service";
import { getEntertainmentQuestions, getGeographyQuestions, getHistoryQuestions, getScienceQuestions, getSportQuestions } from "./trivia_service";
import { TriviaQuestion } from "./TriviaQuestion";
import GameOver from "../GameOver";
import { updateTrivialStats } from "../../../services/auth-service";

type Props = {
  difficulty: string;
};

export const TriviaGame = (props : Props) => {
  const [showBlue, setShowBlue] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showYellow, setShowYellow] = useState(false);
  const [showPink, setShowPink] = useState(false);
  const [showOrange, setShowOrange] = useState(false);

  const [diceResult, setDiceResult] = useState(0);
  const [questionShowed, setQuestionShowed] = useState<questionType | null>(null);
  const [isShowingQuestion, setIsShowingQuestion] = useState(false);

  const [answerSelected, setAnswerSelected] = useState(new Array<string>());
  const [questions, setQuestions] = useState<questionType[]>([]);

  const [categoriesPassed, setCategoriesPassed] = useState(new Array<number>());
  

  const easyLifesNumber = 6;
  const hardLifesNumber = 3;
  const [lifes, setLifes] = useState(easyLifesNumber);
 
  const sleep = (ms : number) => new Promise(r => setTimeout(r, ms))

  type SetColorFunction = (bool: boolean) => void; 



  useEffect(() => {
    props.difficulty === getHardString() ? setLifes( hardLifesNumber) : setLifes(easyLifesNumber);
  }, [props.difficulty]);

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
          if(isNumber(question.answers[0]))
            question.answers = question.answers.map((a) => formatNumberWithDots(a));
          

          setQuestionShowed(question);
          setIsShowingQuestion(true);
          
        });
      });
    }
  }, [diceResult]);


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

  const saveAnswer = (answer: string) => {
    answerSelected.push(answer);
    setAnswerSelected(answerSelected);

    setDiceResult(0);

    questions.push(questionShowed as questionType);
    setQuestions(questions);    
  }

  function formatNumberWithDots(str : string) : string {
    
    if (str.length < 5 || str.includes('.')) {
      return str;
    }
    let result = '';
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
      result = str[i] + result;
      if (count % 3 === 2 && i !== 0) {
        result = '.' + result;
      }
    }
  
    return result;
  }
  
  function isNumber(str : string) : boolean {
    return !isNaN(Number(str));
  }

  const getCheeseCount = () => {
    let count = 0;
    if(showBlue) count++;
    if(showGreen) count++;
    if(showYellow) count++;
    if(showPink) count++;
    if(showOrange) count++;
    return count;
  }

  //GAME FINISHED
  if((showBlue && showGreen && showYellow && showPink && showOrange)){
    updateTrivialStats(5);
    return <GameOver answers={answerSelected} questions={questions} finalMessage="You Win !!"/>;
  }else if(lifes === 0){
    updateTrivialStats(getCheeseCount());
    return <GameOver answers={answerSelected} questions={questions} finalMessage="You Loose !! :("/>;
  }

  return (
    <div className="p-5 gap-8 flex justify-start items-start flex-col h-full w-full" data-testid="trivia-game-component">
      <div className="flex w-full gap-4 justify-between mb-10">
        <Cheese
          showBlue={showBlue}
          showGreen={showGreen}
          showYellow={showYellow}
          showPink={showPink}
          showOrange={showOrange}
        />
        <div className="h-full flex items-center" data-testid="lifes">
          {Array.from({ length: lifes }, (_, index) => (
            <span className="text-4xl " key={index}>&#x2764;</span>
          ))}
        </div>
        
        <div className="bg-transparent p-4">
          <h1 style={{color: getCategoryColor("Sports")}}> 1 - Sports</h1>
          <h1 style={{color: getCategoryColor("Science")}}> 2 - Science</h1>
          <h1 style={{color: getCategoryColor("History")}}>3 - History</h1>
          <h1 style={{color: getCategoryColor("Geography")}}>4 - Geography</h1>
          <h1 style={{color: getCategoryColor("Entertainment")}}>5 - Entertainment</h1>
        </div>

      </div>
      {!isShowingQuestion ? 
      <div className="">
      <Button className="text-2xl font-bold w-20 h-20 flex justify-center items-center" onClick={() => {
        let result = generateDiceRandomNumber();
        while(categoriesPassed.includes(result))
          result = generateDiceRandomNumber();  
        setDiceResult(result);        

      }}>
        
      {diceResult === 0 ? "Roll" : diceResult}
      </Button>

      <h1 className="text-text text-2xl mt-2">
        Category: {getCategory(diceResult)}
      </h1>
      </div>
      :

      <TriviaQuestion color={getCategoryColorWithNumber(diceResult)} 
        setColor={getSetColor(diceResult)}  
        questionShowed={questionShowed} 
        setIsShowingQuestion={setIsShowingQuestion}
        saveAnswer={saveAnswer}
        setCategoriesPassed={setCategoriesPassed}
        categoriesPassed={categoriesPassed}
        category={diceResult}
        lifes={lifes}
        setLifesNumber={setLifes}></TriviaQuestion>
      }
      
      
      </div>
  );
};
