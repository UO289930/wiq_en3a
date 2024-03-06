import React, { useState } from "react";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import AnswerPanel from "./AnswerPanel";
import GameOver from "./GameOver";
import { usePlayingState } from "../../stores/playing-store";

export default function Game() {
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(false); // Nuevo estado para controlar si se están cargando nuevas preguntas
    const [score, setScore] = useState(0);
    const [correctSelected, setCorrectSelected] = useState(false);
    const [questionCount, setQuestionCount] = useState(0); // Estado para rastrear el número de preguntas mostradas



  const handleNextQuestion = () => {
    setLoading(true); // Establecer loading en true al hacer clic en "Next Question"
    // Simular carga de nuevas preguntas
    setTimeout(() => {
      setLoading(false); // Establecer loading en false después de un tiempo de espera
      setAnswered(false); // Reiniciar el estado answered
      setQuestionCount(questionCount + 1); // Incrementar el contador de preguntas
    }, 0);
  };

  function getAnswersList(){
    cAnswer = 2;
    return ['a1', 'b2', 'c3', 'd4'];
  }

  var cAnswer=-1;
   

  var questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']

  function getQuestion(){
    return questions[questionCount];
  }


  if (questionCount >= 10) {
    usePlayingState.getState().gameOver();
    return <GameOver score={score} />;
  }

  return (
    <div id='mainContainer' className='flex flex-col  h-screen '>
        
      <div id='pregunta' className='bg-purple-400 h-1/2 border-4 border-purple-700 flex-1'>
        <div className="flex justify-between">
        <text className='text-white text-2xl p-8'> Score: {score} </text>
        {answered && (<NextQuestion onNextQuestion={handleNextQuestion} />)}
        </div>
        <Question questionText={getQuestion()} />
        {answered && (<span className='flex justify-center text-3xl '> {correctSelected?'CORRECT!':'WRONG! correct answer : ' + getAnswersList()[cAnswer]} </span>)}
        
      </div>
      {!loading && <AnswerPanel score={score}
            setCorrectSelected={setCorrectSelected}
            setScore={setScore}answered={answered} setAnswered={setAnswered} answers={getAnswersList()} correctAnswer={cAnswer}/>}
    </div>
  );
}
