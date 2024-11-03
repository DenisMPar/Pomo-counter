import { useCountStore, useTimerStore } from '../../../hooks/store';
import { useTimer } from '../../../hooks/timer';
import classes from './index.module.css';

export function TimerComponent() {
  const activeTimer = useTimerStore((state) => state.activeTimer);
  const setStarted = useTimerStore((state) => state.setStarted);
  const started = useTimerStore((state) => state.started);

  const { minutes, remainingSeconds, allSecondsSetted } = useTimer();
  const pomodoroCounts = useCountStore((state) => state.pomodoroCount);
  const cansCount = useCountStore((state) => state.cansCount);
  const boxesCount = useCountStore((state) => state.boxesCount);
  return (
    <div className={classes.timer_root}>
      <div>
        <span>{activeTimer}</span>
        <div className={classes.counts}>
          <span>current timer: {activeTimer}</span>
          <span>pomodoros: {pomodoroCounts}</span>
          <span>cans: {cansCount}</span>
          <span>boxes: {boxesCount}</span>
        </div>
        <h1 className={classes.timer__title}>
          {String(minutes).padStart(2, '0')}:
          {String(remainingSeconds).padStart(2, '0')}
        </h1>
      </div>
      <div className={classes.timer__buttons_container}>
        <button disabled={!allSecondsSetted} onClick={() => setStarted(true)}>
          Start
        </button>
        <button disabled={!started} onClick={() => setStarted(false)}>
          Stop
        </button>
      </div>
    </div>
  );
}
