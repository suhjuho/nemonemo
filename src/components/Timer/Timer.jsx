import { useState, useEffect } from "react";
import { useAnswerStore } from "../../store/store";

function Timer({ state }) {
  const [time, setTime] = useState(0);
  const { isComplete } = useAnswerStore();

  useEffect(() => {
    let timerId;

    if (!isComplete) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [state, isComplete]);

  function formatTime(currentTime) {
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor(currentTime / 60) - hours * 60;
    const seconds = currentTime % 60;

    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return <div>{formatTime(time)}</div>;
}

export default Timer;
