import React from 'react';
import { FaLink, FaSkullCrossbones, FaSmile, FaGithub, FaBook, FaFileAlt, FaBrain, FaGamepad } from 'react-icons/fa';

const Info = () => {
  return (
    <div className="flex flex-col justify-center text-text p-4 mt-4 gap-4">
      <h1 className="text-5xl font-bold self-center">INFORMATION</h1>
      <img className="w-96 h-full  self-center object-cover transition-transform duration-100 transform hover:scale-110" src='/penguins.webp' alt='Descripción de la imagen' />

      <div className='flex items-center font-semibold text-4xl gap-2'><FaBook />          
            <h2>Rules: </h2></div>      
      <p className="text-text text-2xl" >Welcome to the game when you can became the penguins emperor! But... it will not be so easy...</p>
      <p className="text-text text-2xl" >For you to become the king, you should pass the game without errors. Show off your knowledge 🧠 in our two exciting game modes:</p>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center text-3xl gap-2'><FaGamepad />          
            <h2>Normal Game: </h2></div>      
            <p className="text-2xl">
                You will have to go through 10 different questions of random topics. Each of the questions will have 4 different options but only 1 is correct!
            </p> 
            <div className='flex items-center text-2xl gap-2' style={{ marginLeft: '2em' }}><FaSmile  />         
                <h3>Easy :</h3>
                <p> You have 10 seconds to answer each question. </p> 
            </div>
            <div className='flex items-center text-2xl gap-2' style={{ marginLeft: '2em' }}><FaSkullCrossbones  />         
                <h3> Hard:</h3>
                <p className="text-2xl"> You have 4 second to answer each question.</p> 
            </div>
            
        <div className='flex items-center text-3xl gap-2'><FaBrain />         
            <h2>Trivia game:</h2> </div>          
            <p className="text-2xl">Our favorite, the trivial mode. Test your skills across five categories: Sports, Science, History, Geography, and Entertainment.
                Earn a "cheese🧀" for every correct answer, and collect all five to win.
                The game will end when you gain all the chesses or if you fail a number of questions depending of the difficulty.
            </p>
            <div className='flex items-center gap-2 text-2xl' style={{ marginLeft: '2em' }}><FaSmile  />         
                <h3>Easy: </h3>
                <p> If you fail 6 questions, you will lose the game. </p> 
            </div>
            <div className='flex items-center text-2xl gap-2' style={{ marginLeft: '2em' }}><FaSkullCrossbones  />         
                <h3> Hard:</h3>                
            <p> If you fail 3 questions, you will lose the game. </p> 
            </div>
      </div>

      <div className='flex items-center text-4xl font-semibold gap-2'><FaLink />          
            <h2>Links: </h2></div> 
        <ul>
        <li className="flex items-center gap-2">
          <FaGithub />
          <a className="text-text text-2xl hover:text-primary" href="https://github.com/Arquisoft/wiq_en3a" target="_blank">
            GitHub 
          </a>
        </li>
        <li className="flex items-center gap-2">
          <FaBook />
          <a className="text-text text-2xl hover:text-primary" href="https://arquisoft.github.io/wiq_en3a/" target="_blank">
            Documentation 
          </a>
        </li>
        <li className="flex items-center gap-2">
          <FaFileAlt />
          <a className="text-text text-2xl hover:text-primary" href="http://51.103.210.249:8000/api-doc/" target="_blank">
            OpenAPI 
          </a>
        </li>
      </ul>

    </div>
  );
}

export default Info;