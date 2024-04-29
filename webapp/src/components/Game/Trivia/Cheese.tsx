import React from "react";

export type props = {
    showBlue: boolean,
    showGreen: boolean,
    showYellow: boolean,
    showPink: boolean,
    showOrange: boolean,
}

export const Cheese = (props : props) => {
    
  return (
      <div id="cajaQuesitos" className="caja-quesitos ">

        <div className="caja">
        {props.showBlue && <div data-testid="quesito-azul" className="quesito-azul"></div>}
        {props.showGreen && <div data-testid="quesito-verde" className="quesito-verde"></div>}
        {props.showYellow && <div data-testid="quesito-amarillo" className="quesito-amarillo"></div>}
        {props.showPink && <div data-testid="quesito-rosa" className="quesito-rosa"></div>}
        {props.showOrange && <div data-testid="quesito-naranja" className="quesito-naranja"></div>}

        </div>

    </div>

  );

}