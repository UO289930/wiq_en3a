import React, { useState } from "react";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import AnswerPanel from "./AnswerPanel";
import GameOver from "./GameOver";
import {  useGameQuestions, getQuestion, getAnswersList, getCorrectAnswer, usePlayingState } from "../../stores/playing-store";
import { updateStats } from "../../services/auth-service";

export default function Game() {
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(false); // Nuevo estado para controlar si se están cargando nuevas preguntas
    const [score, setScore] = useState(0);
    const [correctSelected, setCorrectSelected] = useState(false);
    
  const handleNextQuestion = () => {
    setLoading(true); // Establecer loading en true al hacer clic en "Next Question"
    // Simular carga de nuevas preguntas
    setTimeout(() => {
      setLoading(false); // Establecer loading en false después de un tiempo de espera
      setAnswered(false); // Reiniciar el estado answered
      useGameQuestions.getState().nextQuestion(); // Incrementar el contador de preguntas
    }, 0);
  };

  let questions = useGameQuestions(state => state.questions);
  let questionCount = useGameQuestions(state => state.questionCount);
  let isGameOver = usePlayingState(state => state.isGameOver);
  
  if (questionCount === 10) {
    updateStats(questionCount, score/10)
    usePlayingState.getState().gameOver();
    return <GameOver score={score} />;
  } else {
    var questionText = getQuestion(questions, questionCount);
    var answers = getAnswersList(questions, questionCount);
    var correctAnswer = getCorrectAnswer(questions, questionCount);
  }

  


  
 
  
    return (
      <div id='mainContainer' className='flex flex-col h-full text-text'>
          
        <div id='pregunta' className='h-1/2 flex-1'>
          <div className="flex justify-between">
          <text className='text-white text-2xl font-bold p-8'> Score: {score} </text>
          {answered && (<NextQuestion onNextQuestion={handleNextQuestion} />)}
          </div>
          <Question questionText={questionText} />
          {answered && (<span className='flex justify-center text-3xl '> {correctSelected?'CORRECT!':'WRONG! correct answer : ' + answers[correctAnswer]} </span>)}
          
        </div>
        {!loading && <AnswerPanel score={score}
              setCorrectSelected={setCorrectSelected}
              setScore={setScore}answered={answered} setAnswered={setAnswered} answers={answers} correctAnswer={correctAnswer}/>}
      </div>
    );
}
