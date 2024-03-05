import React, { useState } from "react";
import AddUser from "./AddUser";
import Login from "./Login";

type props = {
  setIsLoggedState: (isLogged: boolean) => void;
}

const Authentication = (props : props) => {
  const [showLogin, setShowLogin] = useState(true);


  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    
    <div className="container mx-auto">
      
      {showLogin ? <Login setIsLoggedState={props.setIsLoggedState} /> : <AddUser />}
      <div className="text-center mt-8">
        {showLogin ? (
          <button
            className="text-blue-500 hover:underline"
            onClick={handleToggleView}
          >
            Don't have an account? Register here.
          </button>
        ) : (
          <button
            className="text-blue-500 hover:underline"
            onClick={handleToggleView}
          >
            Already have an account? Login here.
          </button>
        )}
      </div>
    </div>
  );
}

export default Authentication;
