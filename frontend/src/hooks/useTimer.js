import React, { useEffect, useRef, useState } from "react";
import "./timer.css";
function useTimer(time) {
  const [timer, setTimer] = useState(time);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);
  const pause = () => {
    setIsRunning(false);
  };
  const resume = () => {
    setIsRunning(true);
  };
  const reset = () => {
    setTimer(time);
    setIsRunning(true);
  };
  useEffect(() => {
    if (!isRunning || intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  return {
    minutes,
    seconds,
    isRunning,
    timer,
    pause,
    resume,
    reset,
  };
}

export default useTimer;
