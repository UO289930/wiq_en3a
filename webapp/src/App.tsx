import React, { useEffect } from 'react';
import Game from './components/Game/Game';
import { loginWithToken } from './services/auth-service';
import Authentication from './components/auth/Authentication';
import { useUserStore } from './stores/user-store';

function App() {
  
  const user = useUserStore(state => state.user);
  
  useEffect(() => {
    loginWithToken();
  }, []);

  if (user == null) {
    return <Authentication/>
  }
  else {
    return <Game />
  }
  
}

export default App;