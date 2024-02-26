import React, { useState } from "react";
import Authentication from "./components/Authentication";
import Game from "./components/Game";
function App() {
  const devMode = false;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the 2024 edition of the Software Architecture course
      </h1>
      {devMode ? <Game /> : <Authentication />}
    </div>
  );
}

export default App;
