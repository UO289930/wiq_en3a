import React, { useEffect } from 'react';
import { loginWithToken } from './services/auth-service';
import Authentication from './components/auth/Authentication';
import { useUserStore } from './stores/user-store';
import { Home } from './components/general/Home';

function App() {
  
  const user = useUserStore(state => state.user);
  
  useEffect(() => {
    loginWithToken();
  }, []);

  // if (user == null) {
  //   return <Authentication/>
  // }
  // else {
  //   return <Home />
  // }
  return <Home />
  
}

export default App;