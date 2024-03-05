import React, { useState } from 'react';
import Game from './components/Game/Game';
import { isLogged } from './services/auth-service';
import Authentication from './components/auth/Authentication';




function App() {
  const [isLoggedState, setIsLoggedState] = useState(isLogged());

  if (!isLoggedState) {
    return <Authentication setIsLoggedState={setIsLoggedState}/>
  }
  return <Game />
}

export default App;