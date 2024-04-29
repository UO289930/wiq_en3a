import React, { useEffect, useState } from "react";
import Question from "./Question";
import AnswerPanel from "./AnswerPanel";
import GameOver from "./GameOver";
import Counter from "./Counter";
import Countdown from "./Countdown";
import {getHardString, getQuestionsFromApi, Question as questionType} from "../../services/question-service";
import { updateStats } from "../../services/auth-service";

type Props = {
  difficulty: string;
};

export const formatNumberWithDots = (str : string) => {
    
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
};


export default function Game(props: Props) {
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [loadingdata, setLoadingData] = useState(true);
    const [score, setScore] = useState(0);
    const [correctSelected, setCorrectSelected] = useState(false);

    var questionTime = 100;
    if(props.difficulty === getHardString()) 
      questionTime = 40; 
    
    const [count, setCount] = useState(questionTime);  

    const[questions, setQuestions] = useState<questionType[]>([]);
    const[questionCount, setQuestionCount] = useState(0);

    const [answerSelected, setAnswerSelected] = useState(new Array<string>());

    useEffect(() => {
      getQuestionsFromApi().then((questions : questionType[]) => {
          questions.map((q) => {
            if(!isNaN(Number(q.answers[0]))){
              q.answers = q.answers.map((a) => formatNumberWithDots(a));
            }
          });
          setQuestions(questions)
          setLoadingData(false);
      })
    }, []);

  const goToNextQuestion = () => {
      setCount(questionTime);  
      setCorrectSelected(false);
      setQuestionCount(questionCount+1);
      setLoading(true); 

      setTimeout(() => {
        setLoading(false); 
        setAnswered(false);
      }, 0);
  }
    
  const handleNextQuestion = () => {
    if(count===0) saveAnswer(' ');
    var q = questionCount;
    
    if(questionCount < 9){
      setTimeout(() => {
        if(q === questionCount)
          goToNextQuestion();
      }, 3000);
    }else{
      goToNextQuestion();
    }
  };

  const saveAnswer = (answer: string) => {
    answerSelected.push(answer);
    const newAnswerSelected = [...answerSelected];
    setAnswerSelected(newAnswerSelected);
  }

  useEffect(() => {
    if(answered) handleNextQuestion();
  }, [answered]);

 
  if (questionCount === 10) {
    updateStats(questionCount, score/10); 
    return <GameOver data-testid="game-over-component" answers={answerSelected} questions={questions} finalMessage="Game Over" />;
  } 

  
  
  return (
    <div className="h-4/5" data-testid="game-component">
      {loadingdata ? <h1>Loading...</h1> :
      <div data-testid="game-container" id='mainContainer' className='flex flex-col h-full text-text'>
        <div id='pregunta' className='h-1/2 flex-1'>
          <div className="flex justify-between">
            <text className='text-white text-xl font-bold p-4'> {questionCount+1}/{questions.length} </text>
            <Counter answered={answered} setAnswered={setAnswered} duration={questionTime} count={count} setCount={setCount} initialCount={questionTime}/>  
          </div>
          <Question questionText={questions[questionCount].text} />
          {answered && (<span className='flex justify-center text-3xl '> {count===0?'You ran out of time':(correctSelected?'CORRECT!':'WRONG! correct answer : ' + questions[questionCount].answers[questions[questionCount].correctAnswer])} </span>)}
          {answered && questionCount < 9 && (<Countdown duration={3}/>)}
          
        </div>
          {!loading && <AnswerPanel score={score}
            setCorrectSelected={setCorrectSelected}
            setScore={setScore} 
            answered={answered} 
            setAnswered={setAnswered} 
            setAnswerSelected={saveAnswer}
            answers={questions[questionCount].answers} 
            correctAnswer={questions[questionCount].correctAnswer} />}

      </div>
      
      }
    </div>
    
  );
}