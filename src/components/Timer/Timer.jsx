import { useState, useEffect } from "react";
import { useAnswerStore, useGameTimeStore } from "../../store/store";
import formatTime from "../../utils/formatTime";

function Timer({ state }) {
  const [time, setTime] = useState(0);
  const { changeGameTimeState } = useGameTimeStore();
  const { isComplete } = useAnswerStore();

  useEffect(() => {
    let timerId;

    if (!isComplete) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 1);
        changeGameTimeState(time + 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [time, state, isComplete]);

  return <div>{formatTime(time)}</div>;
}

export default Timer;
