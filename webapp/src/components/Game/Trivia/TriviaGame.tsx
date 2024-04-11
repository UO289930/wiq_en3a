import React from 'react';
import { Cheese } from './Cheese';
import { useState } from 'react';
import { Dice } from './Dice';


export const TriviaGame = () => {

  const[showBlue, setShowBlue] = useState(true);
  const[showGreen, setShowGreen] = useState(true);
  const[showYellow, setShowYellowCheese] = useState(true);
  const[showPink, setShowPinkCheese] = useState(true);
  const[showCyan, setShowCyanCheese] = useState(true);

  const[diceResult, setDiceResult] = useState(0)
    

  const getCategory = (diceResult: number) => {
    if (diceResult === 1 || diceResult === 2) {
      return 'Science';
    }
    if (diceResult === 3 || diceResult === 4) {
      return 'History';
    }
    if (diceResult === 5 || diceResult === 6) {
      return 'Geography';
    }
    return 'Science';
  }
  

  return (
    <div className='p-5 gap-8 flex justify-start items-start flex-col h-full w-ful'>
      <div className='flex justify-start gap-4 items-center'>
      <Cheese 
        showBlue={showBlue}
        showGreen={showGreen}
        showYellow={showYellow}
        showPink={showPink}
        showCyan={showCyan}
      />
      <button onClick={() => setShowBlue(!showBlue)} className='bg-blue-500 text-white p-2 rounded-md'>Toggle Blue</button>
      <button onClick={() => setShowGreen(!showGreen)} className='bg-green-500 text-white p-2 rounded-md'>Toggle Green</button>
      <button onClick={() => setShowYellowCheese(!showYellow)} className='bg-yellow-500 text-white p-2 rounded-md'>Toggle Yellow</button>
      <button onClick={() => setShowPinkCheese(!showPink)} className='bg-pink-500 text-white p-2 rounded-md'>Toggle Pink</button>
      <button onClick={() => setShowCyanCheese(!showCyan)} className='bg-cyan-500 text-white p-2 rounded-md'>Toggle Cyan</button>
      </div>

      <Dice setDiceResult={setDiceResult} />

  
        <h1 className='text-text text-2xl'>Category: {getCategory(diceResult)}</h1>
       

      

    </div>
  );

}

