import React from "react";
import {Button} from "../ui/button";

type props = {
    onNextQuestion: () => void;
    };

const NextQuestion = (props : props) =>{
  return (
      <Button className='m-5 p-3' variant={"ghost"} onClick={ () => props.onNextQuestion()}>
        Next Question {'->'}
      </Button>
    );

  // useEffect(() => {
  //   props.onNextQuestion(); // Ejecutar la función onNextQuestion al renderizar el componente
  // }, [props]); // Dependencia vacía para garantizar que solo se ejecute una vez

  // return null;
  }

export default NextQuestion; 