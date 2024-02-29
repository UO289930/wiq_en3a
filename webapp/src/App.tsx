import React, { useState } from 'react';

function Answer({ answer, correctAnswer, answered, setAnswered }) {
  const commonStyle = 'flex justify-center items-center border-4 border-purple-700 py-2 px-4 rounded text-white font-bold text-2xl '

  const [clicked, setClicked] = useState(false);
  const [buttonClass, setButtonClass] = useState(`${commonStyle} hover:bg-purple-700 bg-purple-500`);

  const handleClick = () => {
    setClicked(true);
    setAnswered(true);
    processBhColor();
    correctSelected=correctAnswer;
    if(correctAnswer) score+= 10;
    console.log(score);
  };

  const processBhColor = () => {
    const newClass = correctAnswer ? 'bg-green-500' : 'bg-red-500';
    setButtonClass( () => `${commonStyle} ${newClass}`);
  };

  return (
      <button 
        className={buttonClass}
        onClick={handleClick}
        disabled={answered || clicked}
      >
        {answer}
      </button>
  );
}

function Question({ question }) {
  return (
    <div className='flex justify-center items-center h-1/2'>
      <span className='text-white font-sans text-4xl'>{question}</span>
    </div>
  );
}


function Answers({ answered, setAnswered, answers, correctAnswer }) {
  return (
    <div id='respuestas' className="grid grid-cols-2 bg-purple-500  ">
      <Answer answer={answers[0]} correctAnswer={correctAnswer===0} answered={answered} setAnswered={setAnswered} />
      <Answer answer={answers[1]} correctAnswer={correctAnswer===1} answered={answered} setAnswered={setAnswered} />
      <Answer answer={answers[2]} correctAnswer={correctAnswer===2} answered={answered} setAnswered={setAnswered} />
      <Answer answer={answers[3]} correctAnswer={correctAnswer===3} answered={answered} setAnswered={setAnswered} />
      </div>
  );
}


function NextQuestion({ onNextQuestion }) {
  const goToNextQuestion = () => {
    onNextQuestion();
  };

  return (
    <button className='absolute top-0 right-0 bg-white m-8' onClick={goToNextQuestion}>
      Next Question
    </button>
  );
}

function App() {
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar si se están cargando nuevas preguntas

  const handleNextQuestion = () => {
    setLoading(true); // Establecer loading en true al hacer clic en "Next Question"
    // Simular carga de nuevas preguntas
    setTimeout(() => {
      setLoading(false); // Establecer loading en false después de un tiempo de espera
      setAnswered(false); // Reiniciar el estado answered
    }, 0);
  };

  return (
    <div id='mainContainer' className='grid grid-rows-2 h-screen '>
      <div id='pregunta' className='bg-purple-400 border-4 border-purple-700'>
        <text className='text-black border-4 border-purple-600 absolute top-0 left-0 text-2xl m-8'> Score: {score} </text>
        <Question question={getQuestion()} />
        {answered && (<span className='flex text-black justify-center text-3xl '> {correctSelected?'CORRECT!':'WRONG! correct answer : ' + getAnswersList()[cAnswer]} </span>)}
        {answered && (<NextQuestion onNextQuestion={handleNextQuestion} />)}
      </div>
      {!loading && <Answers answered={answered} setAnswered={setAnswered} answers={getAnswersList()} correctAnswer={cAnswer}/>}
    </div>
  );
}

function getAnswersList(){
  cAnswer = 2;
  return ['a1', 'b2', 'c3', 'd4'];
}
var cAnswer=-1;
function getQuestion(){
  return 'Which is the correct answer??';
}
var correctSelected = false;

var score = 0;

export default App;