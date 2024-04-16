import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Question } from "../../services/question-service";



type props = {
  questions: Question[],
  answers : string[];
};



const GameOver = (props: props) => {

  const getScore = () => {
    let score = 0;
    for (let i = 0; i < props.questions.length; i++) {
      if (props.questions[i].answers[props.questions[i].correctAnswer] === props.answers[i]) {
        score++;
      }
    }
    return (score/props.questions.length) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-text gap-16">
      <h1 className="text-6xl font-bold ">Game Over</h1>
      <div>
        <div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2">Correct Answer</th>
                <th className="px-4 py-2">Your Answer</th>
                <th className="px-4 py-2">Info</th>
              </tr>
            </thead>
            <tbody>
              {props.questions.map((question, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{question.text}</td>
                  <td className="border px-4 py-2 text-center">{question.answers[question.correctAnswer]}</td>
                  <td className={`border px-4 py-2 font-bold text-center ${question.answers[question.correctAnswer] === props.answers[index] ? 'bg-primary' : 'bg-danger'}`}>{props.answers[index]}</td>
                  <td className="border px-4 py-2 text-center"><a href={question.wikiLink}>info</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-2xl mt-4">Score: {getScore()}</p>
      </div>
      <div className="flex">
      <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/home`}>Home</Link>
      </div>
    </div>
  );
};

export default GameOver;
