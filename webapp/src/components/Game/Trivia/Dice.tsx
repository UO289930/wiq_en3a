import React, { useRef } from 'react'
import ReactDice, { ReactDiceRef } from 'react-dice-complete'

type props = {
    setDiceResult: (diceResult: number) => void
}


export const Dice = (props:props) => {
    
  const reactDice = useRef<ReactDiceRef>(null)

  const rollDone = (totalValue: number, values: number[]) => {

    props.setDiceResult(totalValue)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
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