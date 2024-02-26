import React, { useState } from "react";
import Authentication from "./components/Authentication";
import Game from "./components/Game";
function App() {
  const devMode = false;

  return (
    <div className="">
      {devMode ? <Game /> : <Authentication />}
    </div>
  );
}

export default App;
