import React from "react";

type props = {
    onNextQuestion: () => void;
    };

const NextQuestion = (props : props) =>{
  
    return (
      <button className='m-5 p-3 border-2 border-purple-900 text-white bg-purple-500 rounded-full hover:bg-purple-700' onClick={ () => props.onNextQuestion()}>
        Next Question
      </button>
    );
  }

export default NextQuestion; 