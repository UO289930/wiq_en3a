import React, { useState, useEffect } from "react";

export type props = {
    answered: boolean,
    correctAnswer: boolean,
    answer: string,
    score: number,
    setAnswered: (answered: boolean) => void,
    setScore: (score: number) => void,
    setCorrectSelected: (correctSelected: boolean) => void,
    handleNextQuestion: () => void,
}

const Answer = (props: props) => {
    const commonStyle = 'flex w-2/5 justify-center items-center py-2 px-4 rounded-2xl text-text font-bold text-2xl border-2 border-text';

    const [buttonClass, setButtonClass] = useState(`${commonStyle} hover:bg-background2 hover:cursor-pointer`);
    const [clickedAnswer, setClickedAnswer] = useState('');

    const handleClick = () => {
        console.log('clicked answer');
        setClickedAnswer(props.answer);
        props.setAnswered(true);
        props.setCorrectSelected(props.correctAnswer);
        if (props.correctAnswer) props.setScore(props.score + 10);
    };

    useEffect(() => {
        if (props.answered) {
            const newClass = props.correctAnswer ? 'bg-primary' : (clickedAnswer === props.answer ? 'bg-danger' : '');
            setButtonClass(`${commonStyle} ${newClass}`);
        } else {
            setButtonClass(`${commonStyle} hover:bg-background2 hover:cursor-pointer`);
        }
    }, [props.answered, props.correctAnswer, clickedAnswer]);

    return (
        <button
            className={buttonClass}
            onClick={handleClick}
            disabled={props.answered}
        >
            {props.answer}
        </button>
    );
}

export default Answer;