import React, { useState, useEffect } from 'react';
import { Progress } from "../ui/Progress"


type props = {
    answered: boolean,
    setAnswered: (answered: boolean) => void,
    duration: number,
    count: number,
    setCount: (count: number) => void,
}

const Counter = (props: props) => {
    useEffect(() => {
        const timer = setInterval(() => {            
            props.setCount(props.count>0?props.count-1:0);
        }, 10);

        if(props.answered) clearInterval(timer);

        return () => {
            clearInterval(timer);
        };
    }, [props.count, props.answered]);

    useEffect(() => {
        if (props.count === 0) {
            props.setAnswered(true);
        }
    }, [props.count]);

    return <Progress value={props.count/10} className="self-center w-[100%]" />;
};

export default Counter;