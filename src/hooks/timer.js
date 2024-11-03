import { useEffect } from 'react';
import { useTimerStore, useCountStore } from './store';

export function useTimer() {
  const {
    activeTimer,
    startSeconds,
    decrementStartSeconds,
    pomodoroSeconds,
    shortBreakSeconds,
    longBreakSeconds,
    started,
    setStartSeconds,
    setActiveTimer,
  } = useTimerStore((state) => state);
  const pomodoroCount = useCountStore((state) => state.pomodoroCount);
  const incrementCounts = useCountStore((state) => state.incrementCounts);

  useEffect(() => {
    if (started && startSeconds > 0) {
      const interval = setInterval(() => {
        decrementStartSeconds();
      }, 1000);
      return () => clearInterval(interval);
    }
    const finishedCycle = started && startSeconds === 0;
    if (finishedCycle) {
      if (activeTimer === 'pomodoro') {
        handlePomodoroFinish({
          pomodoroCount,
          setStartSeconds,
          longBreakSeconds,
          shortBreakSeconds,
          setActiveTimer,
        });
        incrementCounts();
      }
      if (activeTimer === 'short-break' || activeTimer === 'long-break') {
        setStartSeconds(pomodoroSeconds);
        setActiveTimer('pomodoro');
      }
    }
  }, [started, startSeconds, decrementStartSeconds]);

  const allSecondsSetted =
    pomodoroSeconds && shortBreakSeconds && longBreakSeconds;
  const minutes = Math.floor(startSeconds / 60);
  const remainingSeconds = startSeconds % 60;

  return { minutes, remainingSeconds, allSecondsSetted };
}

function handlePomodoroFinish({
  pomodoroCount,
  setStartSeconds,
  shortBreakSeconds,
  longBreakSeconds,
  setActiveTimer,
}) {
  const hasToStartShotBreak = (pomodoroCount + 1) % 4 !== 0;
  const hasToStartLongBreak = (pomodoroCount + 1) % 4 === 0;
  console.log({ pomodoroCount, hasToStartShotBreak, hasToStartLongBreak });

  if (hasToStartShotBreak) {
    setStartSeconds(shortBreakSeconds);
    setActiveTimer('short-break');
  }
  if (hasToStartLongBreak) {
    setStartSeconds(longBreakSeconds);
    setActiveTimer('long-break');
  }
}
