import React, { useEffect } from 'react';
import { loginWithToken } from './services/auth-service';
import Authentication from './components/auth/Authentication';
import { useUserStore } from './stores/user-store';
import { Home } from './components/general/Home';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { SimpleNav } from './components/general/SimpleNav';
import { TriviaGame } from './components/Game/Trivia/TriviaGame';
import GameStatisticsPage from './components/GameStatistics/GameStatisticsPage';


function App() {
  
  const user = useUserStore(state => state.user);
  
  useEffect(() => {
    loginWithToken();
  }, []);

  if (user == null) {
    return <Authentication/>
  }
  else {
    
    return (
      <Router>
        <SimpleNav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/statistics" element={<GameStatisticsPage/>} />
          <Route path="trivia" element={<TriviaGame/>} /> 
        </Routes>
      </Router>
    )
  }
  
}



export default App;