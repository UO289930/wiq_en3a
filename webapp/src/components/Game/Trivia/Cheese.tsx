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
      <div className="caja-quesitos ">

        <div className="caja">
            {props.showBlue && <div className="quesito-azul"></div>}
            {props.showGreen && <div className="quesito-verde"></div>}
            {props.showYellow && <div className="quesito-amarillo"></div>}
            {props.showPink && <div className="quesito-rosa"></div>}
            {props.showOrange && <div className="quesito-naranja"></div>}

        </div>

    </div>

  );

}