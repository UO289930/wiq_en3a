import React, { useState } from "react";

type props = {
    answered : boolean,
    correctAnswer : boolean,
    answer : string,
    score: number,
    setAnswered : (answered : boolean) => void,
    setScore : (score : number) => void
    setCorrectSelected : (correctSelected : boolean) => void
}

const Answer = (props : props) => {

    const commonStyle = 'flex justify-center items-center border-4 border-purple-700 py-2 px-4 rounded text-white font-bold text-2xl ';
  
    const [clicked, setClicked] = useState(false);
    const [buttonClass, setButtonClass] = useState(`${commonStyle} hover:bg-purple-700 bg-purple-500`);
  
    const handleClick = () => {
      setClicked(true);
      props.setAnswered(true);
      processBhColor();
      props.setCorrectSelected(props.correctAnswer);
      if(props.correctAnswer) props.setScore(props.score + 10);
      console.log(props.score);
    };
  
    const processBhColor = () => {
      const newClass = props.correctAnswer ? 'bg-green-500' : 'bg-red-500';
      setButtonClass( () => `${commonStyle} ${newClass}`);
    };

    return (
        <button 
          className={buttonClass}
          onClick={handleClick}
          disabled={props.answered || clicked}
        >
          {props.answer}
        </button>
    );

    
  
    
  }

export default Answer;