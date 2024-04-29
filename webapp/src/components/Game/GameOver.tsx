import React from "react";
import { Link } from "react-router-dom";
import { Question } from "../../services/question-service";


type props = {
  questions: Question[],
  answers : string[];
  finalMessage: string;
};



const GameOver = (props: props) => {

 const images = {
  lowScore: '/julien.png',
  mediumScore: '/rico.webp',
  highScore: '/kowalski.webp',
};

  const getScore = () => {
    let score = 0;
    for (let i = 0; i < props.questions.length; i++) {
      if (props.questions[i].answers[props.questions[i].correctAnswer] === props.answers[i]) {
        score++;
      }
    }
    return score;
  };

  // Set the image according to the score
  let score = getScore();
  let imageToShow;
  let message;
  let scorePercentage = (score / props.questions.length) * 100;
  if (scorePercentage < 50
  ) {
    imageToShow = images.lowScore;
    message = "You are NOT smarter than a penguin";
  } else if (scorePercentage < 100) {
    imageToShow = images.mediumScore;
    message = "You ARE smarter than a penguin";
  } else {
    imageToShow = images.highScore;
    message = "You ARE smarter than the SMARTEST penguin";
  }

  return (
    <div className="flex flex-col items-center justify-center text-text gap-5">
      <div className="w-full flex mt-5 justify-center gap-7 items-center ">
      <div className="flex flex-col justify-center items-center gap-8 ">
      <h1 className="text-3xl font-bold text-center w-96">{message}</h1>
      
      </div>
      <img src={imageToShow} alt="Score image" className="w-32" /> 
      </div>
      <div>
        <div>
          <table className="table-auto">
            <thead>
              <tr className="header">
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2">Your Answer</th>
                <th className="px-4 py-2">Correct Answer</th>
                <th className="px-4 py-2">Info</th>
              </tr>
            </thead>
            <tbody>
              {props.questions.map((question, index) => (
                <tr className="body-row">
                  <td className="border px-4 py-2">{question.text}</td>
                  <td className={`border px-4 py-2 font-bold text-center ${question.answers[question.correctAnswer] === props.answers[index] ? 'bg-primary' : 'bg-danger'}`}>{props.answers[index]}</td>
                  <td className="border px-4 py-2 text-center">{question.answers[question.correctAnswer]}</td>
                  <td className="border px-4 py-2 text-center"><a className="hover:text-primary" target="_blank" href={question.wikiLink}>info</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center gap-6 mt-4">
        <p className="text-2xl">Score: {getScore()} / {props.questions.length}</p>
        <Link className="text-text border text-center border-text hover:bg-background2 p-3 rounded-xl text-xl" to={"/home"}>Back to home</Link>
        </div>
        
      </div>
    </div>
  );
};

export default GameOver;
