import React, { useEffect } from 'react';
import { loginWithToken } from './services/auth-service';
import Authentication from './components/auth/Authentication';
import { useUserStore } from './stores/user-store';
import { Home } from './components/general/Home';
import Info from './components/general/Info';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SimpleNav } from './components/general/SimpleNav';
import { TriviaGame } from './components/Game/Trivia/TriviaGame';
import LeaderBoard from './components/leaderboard/LeaderBoard';
import Game from './components/Game/Game';
import { Logout } from './components/auth/Logout';
import Statistics from './components/stats/Statistics';
import { getEasyString, getHardString } from './services/question-service';

function App() {
  
  const user = useUserStore(state => state.user);
    
  useEffect(() => {
    loginWithToken();
  }, []);

  if (!user) {
    return <Authentication/>
  }
  else {
    
    return (
      <Router>
        <SimpleNav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="game" element={<Game difficulty={getEasyString()}/>} /> 
          <Route path="game/hard" element={<Game difficulty={getHardString()}/>} /> 
          <Route path="trivia" element={<TriviaGame difficulty={getEasyString()}/>} /> 
          <Route path="trivia/hard" element={<TriviaGame difficulty={getHardString()}/>} /> 
          <Route path="/leaderboard" element={<LeaderBoard />}/>
          <Route path="/stats" element={<Statistics />}/>
          <Route path="/info" element={<Info/>} />
          <Route path="logout" element={<Logout/>} />
          <Route path="*" element={<Home/>} />

        </Routes>
      </Router>
    )
  }
  
}



export default App;