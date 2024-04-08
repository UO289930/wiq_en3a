import React, { useState, useEffect } from "react";

type Props = {
  duration: number;
};

const Countdown = (props: Props) => {
  const [countdown, setCountdown] = useState(props.duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center text-2xl mt-5">
      Next Question In: {countdown}
    </div>
  );
};

export default Countdown;
