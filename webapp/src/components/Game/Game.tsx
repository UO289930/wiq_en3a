import React, { useState } from "react";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import AnswerPanel from "./AnswerPanel";
import GameOver from "./GameOver";
import { obtenerPreguntas,useGameQuestions, getQuestion, getAnswersList, getCorrectAnswer } from "../../stores/playing-store";

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

  // obtenerPreguntas();

  let questions = useGameQuestions(state => state.questions);
  let questionCount = useGameQuestions(state => state.questionCount);
  

  console.log(questions);
  
  if (questionCount === 10) {
    return <GameOver score={score} />;
  }

  

  return (
    <div id='mainContainer' className='flex flex-col h-full text-text'>
        
      <div id='pregunta' className='h-1/2 flex-1'>
        <div className="flex justify-between">
        <text className='text-white text-2xl font-bold p-8'> Score: {score} </text>
        {answered && (<NextQuestion onNextQuestion={handleNextQuestion} />)}
        </div>
        <Question questionText={getQuestion(questions, questionCount)} />
        {answered && (<span className='flex justify-center text-3xl '> {correctSelected?'CORRECT!':'WRONG! correct answer : ' + getCorrectAnswer(questions, questionCount)} </span>)}
        
      </div>
      {!loading && <AnswerPanel score={score}
            setCorrectSelected={setCorrectSelected}
            setScore={setScore}answered={answered} setAnswered={setAnswered} answers={getAnswersList(questions, questionCount)} correctAnswer={getCorrectAnswer(questions, questionCount)}/>}
    </div>
  );
}
