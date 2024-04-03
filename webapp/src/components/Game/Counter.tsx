import React, { useState, useEffect } from 'react';

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
        }, 1000);

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

    return <div>{props.count}</div>;
};

export default Counter;