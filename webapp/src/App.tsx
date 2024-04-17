import React, { useEffect } from 'react';
import { loginWithToken } from './services/auth-service';
import Authentication from './components/auth/Authentication';
import { useUserStore } from './stores/user-store';
import { Home } from './components/general/Home';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { SimpleNav } from './components/general/SimpleNav';
import { TriviaGame } from './components/Game/Trivia/TriviaGame';
import RankingTable from './components/leaderboard/RankingTable';
import LeaderBoard from './components/leaderboard/LeaderBoard';
import Game from './components/Game/Game';
import { Logout } from './components/auth/Logout';

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
          <Route path="game" element={<Game/>} /> 
          <Route path="trivia" element={<TriviaGame/>} /> 
          <Route path="/leaderboard" element={<LeaderBoard />}/>
          <Route path="logout" element={<Logout/>} />
          <Route path="*" element={<Home/>} />

        </Routes>
      </Router>
    )
  }
  
}



export default App;