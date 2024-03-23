import React from 'react';

type props = {
    questionText : string
}

const Question = (props : props) => {
    return (
      <div className='flex justify-center items-center h-1/2'>
        <span className='text-white font-sans text-4xl'>{props.questionText}</span>
      </div>
    );
  }


export default Question;
  