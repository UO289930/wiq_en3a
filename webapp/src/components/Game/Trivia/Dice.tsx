import React, { useEffect, useRef } from 'react'
import ReactDice, { ReactDiceRef } from 'react-dice-complete'

type props = {
    setDiceResult: (diceResult: number) => void
}


export const Dice = (props:props) => {
    
  const reactDice = useRef<ReactDiceRef>(null)

    
    function rollDone(num: number) : void {
        props.setDiceResult(num)
    }



  return (
    <ReactDice
      numDice={1}
      ref={reactDice}
      rollDone={rollDone}
      defaultRoll={6}
      faceColor='#00c896'
      dotColor='#f2ecff'
      
    />
  )
}