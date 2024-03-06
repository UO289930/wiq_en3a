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

    const commonStyle = 'flex w-2/5 justify-center items-center py-2 px-4 rounded-2xl text-text font-bold text-2xl border-2 border-text ';
  
    const [clicked, setClicked] = useState(false);
    const [buttonClass, setButtonClass] = useState(`${commonStyle}  hover:bg-background2 hover:cursor-pointer`);
  
    const handleClick = () => {
      setClicked(true);
      props.setAnswered(true);
      processBhColor();
      props.setCorrectSelected(props.correctAnswer);
      if(props.correctAnswer) props.setScore(props.score + 10);
    };
  
    const processBhColor = () => {
      const newClass = props.correctAnswer ? 'bg-primary' : 'bg-danger';
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